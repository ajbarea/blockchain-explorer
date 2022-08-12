// blockchain constructor function
const sha256 = require('sha256');
function Blockchain (time) {
    this.chain = [];
    this.pendingTransactions = [];
    this.createNewBlock(100, '0', '0', time); //genesis block
}

// createNewBlock prototype object is used to create a new block for the chain
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash, time) {
    const newBlock = {
        index: this.chain.length + 1,           //block number
        timestamp: time,                  //time block was created
        transactions: this.pendingTransactions, //new transactions waiting to be placed into a block
        nonce: nonce,                           //function param used for proof of work; NONCE = "N-umber only used-ONCE"
        hash: hash,                             //transaction data for the current block compressed into a string
        previousBlockHash: previousBlockHash,   //transaction data from the previous block
    };

    this.pendingTransactions = [];              //emptying the newTransactions array for the next newBlock
    this.chain.push(newBlock);                  //add new block to Blockchain

    return newBlock;
}

// getLastBlock prototype object is used to return the last block in the blockchain
Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
}

// createNewTransaction prototype object is used to create a new transaction
Blockchain.prototype.createNewTransaction = function (documentTime, documentId, wfVariables, hashString, transactionID) {
    const newTransaction = {
        hashOfPDF: hashString,
        documentTime: documentTime,                  //document timestamp
        documentId: documentId,                      //documentId
        wfVariables: wfVariables,                  //all variables related to that workflow sent by the onTask webhook
        transactionId: transactionID
    };
    this.pendingTransactions.push(newTransaction);  //add new transaction to array
    return(this.getLastBlock()['index'] + 1);       //return the block that the newTransaction will be added to
}

// hashBlock prototype object is used to hash all of a block's data into a single string
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    //all block data is concatenated into one long string
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    //convert data string to hash and return
    return sha256(dataAsString);
}

// proofOfWork prototype object repeatedly runs hashBlock until "safe" nonce is generated
Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
    let nonce = 0; //use 'let' here because nonce & hash values will change a lot in this function!
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    //run hashBlock with all data intact except incremented nonce value
    while(hash.substring(0, 4) !== '0000') {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData,nonce);
    }
    return nonce;
}

// chainIsValid prototype object will check whether a chain is legitimate by:
// 1. comparing current and previous
// 2. making sure every hash starts with four zeroes
// 3. making sure the genesis block data is accurate
Blockchain.prototype.chainIsValid = function(blockchain) {
    //genesis block comparators
    const genesisBlock = blockchain[0];
    const correctNonce = genesisBlock['nonce'] === 100;
    const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
    const correctHash = genesisBlock['hash'] === '0';
    const correctTransactions = genesisBlock['transactions'].length === 0;

    let validChain = true;
    for (let i = 1; i < blockchain.length; i++) {
        const currentBlock = blockchain[i];
        const prevBlock = blockchain[i - 1];
        const blockHash = this.hashBlock (prevBlock['hash'],
            {transactions: currentBlock['transactions'], index: currentBlock['index'] },
            currentBlock['nonce']);

        if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false; //if hashes don't match

        if (blockHash.substring(0, 4) !== '0000') validChain = false; //if hash does not start with four zeroes

        if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false; // if genesis

        console.log('previousBlockHash =>', prevBlock [ 'hash']);
        console.log('currentBlockHash =>', currentBlock [ 'hash']);
    }
    return validChain;
};

module.exports = Blockchain; // export Blockchain constructor function