const mySkyway = require("../database/skyway");
const {first} = require("rxjs/operators");
const transaction = mySkyway.models["transaction"];

const transactionController =
    {
        addTransactionToDB: async (time, documentID, hash, wfVariables, transID, index, blockTime) => {
            try {
                let results = await transaction.create({
                    documentID: documentID,
                    hash: hash,
                    time: time,
                    wfVariables: wfVariables,
                    transactionID: transID,
                    index: index,
                    blockTime: blockTime
                })
                if (results !== null && results.documentID === documentID) {
                    return {status: "success", data: results};
                } else {
                    return {status: "failed", data: `Failed to create transaction ${documentID}`};
                }
            } catch (error) {
                return {status: "error", data: error.message || "Unable to create transaction"};
            }
        },

        deleteTransaction: async (documentID) => {
            try{
                let results = await transaction.destroy({where: {documentID:documentID}})
                return {status:"success", data: results};
            }catch(error){
                return {status:"error", data: error.message || "Unable to delete transaction"};
            }
        },
        getTransactionByHash: async (req, res) => {
            try{
                let results = await transaction.findOne({where: {hash:req.body.hash}})
                if(results){
                    res.status(200).send(results);
                }else{
                    res.send("failed");
                }
            }catch(error){
                res.send("error");
            }
        },
        searchTransaction: async (req, res) => {
            try{
                let results = await transaction.findOne({where: {hash:req.body.hash}})
                if(results){
                    res.status(200).send(results);
                }else{
                    let results = await transaction.findOne({where: {documentID:req.body.documentID}})
                    if(results){
                        res.status(200).send(results);
                    }else{
                        res.status(400).send("Not Found")
                    }
                }
            }catch(error){
                res.status(400).send("error");
            }
        },
        getLatestTransactions: async (req, res) => {
            try{
                let temp = new Array();
                let results = await transaction.findAll();
                let x = 0;
                if (results.length >= 1) {
                    for (let i = results.length - 1; i >= 0; i--) {
                        if (results[i].index !== 1) {
                            temp[x] = results[i];
                            x++;
                        }
                    }
                    res.status(200).send(temp);
                }
                else{
                    res.status(400).send("failed");
                }
            }catch(error){
                res.status(400).send("error");
            }
        },
        getThisMonthTransactions: async (req, res) => {
            try{
                let temp = new Array();
                let date = new Date();
                let firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                //console.log(firstDayOfThisMonth);
                let lastDayOfThisMonth = new Date(date.getFullYear(), date.getMonth() +1, 0);
                console.log(lastDayOfThisMonth.getMonth());
                let results = await transaction.findAll();
                let x = 0;
                if (results.length >= 1) {
                    for (let i = results.length - 1; i >= 0; i--) {
                        if (results[i].blockTime <= lastDayOfThisMonth && results[i].blockTime >= firstDayOfThisMonth && results[i].documentID != null) {
                            temp[x] = results[i];
                            x++;
                        }
                    }
                    res.status(200).send(temp);
                }
                else{
                    res.status(400).send("failed");
                }
            }catch(error){
                res.status(400).send("error");
            }
        },
        getPrevMonthTransactions: async (req, res) => {
            try{
                let temp = new Array();
                let date = new Date();
                let firstDayOfLastMonth = new Date(date.getFullYear(), date.getMonth() -1, 1);
                let lastDayOfLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);
                let results = await transaction.findAll();
                let x = 0;
                if (results.length >= 1) {
                    for (let i = results.length - 1; i >= 0; i--) {
                        if (results[i].blockTime <= lastDayOfLastMonth && results[i].blockTime >= firstDayOfLastMonth && results[i].documentID != null) {
                            temp[x] = results[i];
                            x++;
                        }
                    }
                    res.status(200).send(temp);
                }
                else{
                    res.status(200).send("failed");
                }
            }catch(error){
                res.status(400).send("error");
            }
        },
        getThisMonthByWeek: async (req, res) => {
            try{
                let date = new Date();
                let firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1 );
                let secondWeekOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1 + 7);
                let thirdWeekOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1 + 14);
                let forthWeekOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1 + 21);
                let lastDayOfThisMonth = new Date(date.getFullYear(), date.getMonth() +1, 0);
                let results = await transaction.findAll();
                let x = 0;
                let y = 0;
                let z = 0;
                let j = 0;
                let matrix = new Array(4).fill(0).map(() => new Array());
                if (results.length >= 1) {
                    for (let i = results.length - 1; i >= 0; i--) {
                        if (results[i].blockTime <= secondWeekOfThisMonth && results[i].blockTime >= firstDayOfThisMonth && results[i].documentID != null) {
                            matrix[0][x] = results[i];
                            x++;
                        }
                        if (results[i].blockTime <= thirdWeekOfThisMonth && results[i].blockTime >= secondWeekOfThisMonth && results[i].documentID != null) {
                            matrix[1][y] = results[i];
                            y++;
                        }
                        if (results[i].blockTime <= forthWeekOfThisMonth && results[i].blockTime >= thirdWeekOfThisMonth && results[i].documentID != null) {
                            matrix[2][z] = results[i];
                            z++;
                        }
                        if (results[i].blockTime <= lastDayOfThisMonth && results[i].blockTime >= forthWeekOfThisMonth && results[i].documentID != null) {
                            matrix[3][j] = results[i];
                            j++;
                        }
                    }
                    res.status(200).send(matrix);
                }
                else{
                    res.status(400).send("failed");
                }
            }catch(error){
                res.status(400).send("error");
            }
        },
        getPrevMonthByWeek: async (req, res) => {
            try{
                let date = new Date();
                let firstDayOfLastMonth = new Date(date.getFullYear(), date.getMonth() -1, 1);
                let secondWeekOfLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1 + 7);
                let thirdWeekOfLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1 + 14);
                let forthWeekOfLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1 + 21);
                let lastDayOfLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);
                let results = await transaction.findAll();
                let x = 0;
                let y = 0;
                let z = 0;
                let j = 0;
                let matrix = new Array(4).fill(0).map(() => new Array());
                if (results.length >= 1) {
                    for (let i = results.length - 1; i >= 0; i--) {
                        if (results[i].blockTime <= secondWeekOfLastMonth && results[i].blockTime >= firstDayOfLastMonth && results[i].documentID != null) {
                            matrix[0][x] = results[i];
                            x++;
                        }
                        if (results[i].blockTime <= thirdWeekOfLastMonth && results[i].blockTime >= secondWeekOfLastMonth && results[i].documentID != null) {
                            matrix[1][y] = results[i];
                            y++;
                        }
                        if (results[i].blockTime <= forthWeekOfLastMonth && results[i].blockTime >= thirdWeekOfLastMonth && results[i].documentID != null) {
                            matrix[2][z] = results[i];
                            z++;
                        }
                        if (results[i].blockTime <= lastDayOfLastMonth && results[i].blockTime >= forthWeekOfLastMonth && results[i].documentID != null) {
                            matrix[3][j] = results[i];
                            j++;
                        }
                    }
                    res.status(200).send(matrix);
                }
                else{
                    res.status(400).send("failed");
                }
            }catch(error){
                res.status(400).send("error");
            }
        }
    }
module.exports = transactionController;