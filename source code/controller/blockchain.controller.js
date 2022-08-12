const OnTaskAPI = require("../api/ontask.api");
const Blockchain = require('./blockchain');
const groupAPI = require('./group_acccess_token.controller');
const axios = require("axios");
const uuid = require('uuid');
const sha256 = require('sha256');
const mySkyway = require("../database/skyway");
const transaction = mySkyway.models["transaction"];
let groupAccessToken; //dee20fe5-1840-4dc5-934e-8d2e01b6463a
let transactionController = require('./transaction.controller');
const UserController = require("./user.controller");
uuid.v1();
let PhiBlock;

const blockchainController =
    {
        passStream: async (req, res) =>
        {

            const time = req.body.timestamp;
            const instance = req.body.instanceId;
            const wfVariables = JSON.stringify(req.body.wfVariables);
            //console.log(req);
            //console.log(time);
            console.log(wfVariables);
            console.log(instance);
            let documentBuffer;
            let instanceResponse;
            let docIDPos = wfVariables.indexOf(`"documentId":`) + 14;
            let docId = wfVariables.substring(docIDPos, wfVariables.indexOf(`"}`));
            /*
            await OnTaskAPI.listDocuments(instance, groupAccessToken, (err, instanceRes) => {
                if (err) return res.status(400).send(err);
                else
                {
                    instanceResponse = instanceRes;
                }
            });
            console.log(instanceResponse);
            for (let i = 0; i < instanceResponse.documents.length; i++) {
                let fileName = instanceResponse.documents[i].propertyName;
                console.log(fileName);
                let documentID = req["body"]["wfVariables"][fileName]["documentId"];
                console.log(documentID);
             */
            await groupAPI.getTokenByDocumentId(docId).then((results) => {
                if (results.status === "success")
                {
                    groupAccessToken = results.data.groupAccessToken;
                }
                else
                {
                    return res.status(400).send("Failed to get GroupAccessToken");
                }
            });
                await OnTaskAPI.getDocument(docId, groupAccessToken, (err, document) => {
                    if (err)
                        return res.status(400).send(err);
                    else {
                        documentBuffer = document;
                    }
                });
                let transactionID = uuid.v1().split('-').join('');
                let hash = sha256(documentBuffer);
                let blockIndex = PhiBlock.createNewTransaction(time, docId, wfVariables, hash, transactionID); //modify createNewTransaction to generate the hash with "string"
                //if the database is running slow, onTask sends 3 payloads, which would actually create 3 pending transactions where two of them are not wanted
                let blockTime = Date.now();
                await axios.post("/blockchain/mine", {
                        blockTime: blockTime
                    }
                ).then((response) => {
                })
                await transactionController.addTransactionToDB(time, docId, hash, wfVariables, transactionID, blockIndex, blockTime)
                    .then((results) => {
                        if (results.status !== "success") {
                            console.log(results);
                            return res.status(400).send("Adding transaction Failed");
                        }
                    });
            //}
            return res.status(200).send("Successfully added a transaction.")
        },

        Blockchain: (req, res) => {
            res.send(PhiBlock);
        },

        Mine: (req, res) => {
            //previous block's index and hash
            const lastBlock = PhiBlock.getLastBlock();
            const previousBlockHash = lastBlock['hash'];

            //current block data has current index (previous + 1) and pending transactions array
            const currentBlockData = {
                transactions: PhiBlock.pendingTransactions,
                index: lastBlock['index'] + 1
            };

            const nonce = PhiBlock.proofOfWork(previousBlockHash, currentBlockData); //acquire 'safe' hash nonce
            const blockHash = PhiBlock.hashBlock(previousBlockHash, currentBlockData, nonce); //hash data with safe nonce
            const newBlock = PhiBlock.createNewBlock(nonce, previousBlockHash, blockHash, req.body.blockTime); //create new block

            res.json({ note: "New block mined successfully", block: newBlock }); //new block creation success note
        },

        Consensus: (req, res) => {
            const value = PhiBlock.chainIsValid(PhiBlock.chain);
            res.json({ note:`CHAIN VALID: ${value}.`});
        },

        getLatestBlock: (req, res) => {
            const block = PhiBlock.getLastBlock()
            res.send(block);
        },

        updateTransactions: async (req, res) => {
            try {
                if (PhiBlock !== undefined)
                    res.json({note: "updateTransactions should only be called when the blockchain is empty"});
                else {
                    let blockTime = 0;
                    let maxIndex = 0;
                    const result = await transaction.findAll();
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].index === 1) {
                            PhiBlock = new Blockchain(result[i].blockTime);
                            break;
                        }
                    }
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].index > maxIndex) {
                            maxIndex = result[i].index;
                        }
                    }
                    for (let x = 2; x < maxIndex + 1; x++) {
                        for (let j = 0; j < result.length; j++) {
                            if (result[j].index === x) {
                                PhiBlock.createNewTransaction(result[j].time, result[j].documentID, result[j].wfVariables, result[j].hash, result[j].transactionID);
                                blockTime = result[j].blockTime;
                            }
                        }
                        await axios.post("/blockchain/mine", {
                                blockTime: blockTime
                            }
                        ).then((response) => {
                        })
                    }
                    res.json({note: "Transactions Updated."});
                }
            } catch (error) {
                return {status: "error", data: error.message || "Unable to update transactions"};
            }
        },

        getGroupAPIKey: (apiKey) => {
            groupAccessToken = apiKey
            if (groupAccessToken != undefined)
                return {status:"success", data: groupAccessToken};
            else
            {
                return {status:"error", data: "Unable to grab API key"};
            }
        }
    }
module.exports = blockchainController;