const sha256 = require("sha256");
const axios = require("axios");
document.getElementById('checkFile').addEventListener('click', checkFile);
document.getElementById("searchBtn").addEventListener('click', displaySearch);
document.getElementById('updateBlockchain').addEventListener('click', updateBlockchain);
document.getElementById('previousPage').addEventListener('click', prevPage);
document.getElementById('nextPage').addEventListener('click', nextPage);
document.getElementById('previousBlock').addEventListener('click', prevBlock);
document.getElementById('nextBlock').addEventListener('click', nextBlock);
document.getElementById('recentDoc0').addEventListener('click', function()
{
    clickDocIdToDisplayInfo(0);
});
document.getElementById('recentDoc1').addEventListener('click', function()
{
    clickDocIdToDisplayInfo(1);
});
document.getElementById('recentDoc2').addEventListener('click', function()
{
    clickDocIdToDisplayInfo(2);
});
document.getElementById('recentDoc3').addEventListener('click', function()
{
    clickDocIdToDisplayInfo(3);
});
document.getElementById('recentDoc4').addEventListener('click', function()
{
    clickDocIdToDisplayInfo(4);
});
let pageIndex = 1;
let lastPage = 0;
let transactions = new Array();
let blockchain = new Array();
let blockIndex = 0;
let lastBlock = 0;
//called when loaded to get latest transactions
async function getLatestTransactions()
{
    axios.get("/admin/getLatestTransactions"
    ).then(res => {
        transactions = res.data;
        let x = 0;
        lastPage = Math.ceil(transactions.length / 5);
        for (let i = 0; i < transactions.length; i++)
        {
            if (x < 5 && transactions[i].documentID !== undefined)
                document.getElementById(`recentDoc${i}`).innerHTML = `Document ID: ${transactions[i].documentID} sent on ${transactions[i].time}<br></br>`;
            x++;
        }
        document.getElementById("latestDocuments").style.display = "table";
        document.getElementById("previousPage").style.display = "inline";
        document.getElementById("nextPage").style.display = "inline";
        return transactions;
    }).catch(error => {
        console.log(error);
    })
}
//called when loaded to get latest blocks
async function getLatestBlocks()
{
    axios.get("/blockchain/blockchain"
    ).then(res => {
        blockchain = res.data;
        for (let i = 0; i < blockchain.chain.length; i++)
        {
            if (i === blockchain.chain.length - 1)
            {
                document.getElementById("recentBlock").innerHTML = `Block Hash: ${blockchain.chain[i].hash}<br></br>Index: ${blockchain.chain[i].index}<br></br>Nonce: ${blockchain.chain[i].nonce}<br></br>Previous Block Hash: ${blockchain.chain[i].previousBlockHash}<br></br>Time Stamp: ${blockchain.chain[i].timestamp}`;
                document.getElementById("latestBlock").style.display = "table";
                document.getElementById("previousBlock").style.display = "inline";
                document.getElementById("nextBlock").style.display = "inline";
                blockIndex = i;
                lastBlock = i;
            }
        }
    }).catch(error => {
        console.log(error);
    })
}
//page changing for transaction table
async function nextPage()
{
    let x = 0;
    if (pageIndex == lastPage)
    {
        return;
    }
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && ((i + pageIndex * 5) < transactions.length)) {
            document.getElementById(`recentDoc${i}`).innerHTML = `Document ID: ${transactions[i + pageIndex * 5].documentID} sent on ${transactions[i + pageIndex * 5].time}<br></br>`;
        }
        else {
            document.getElementById(`recentDoc${i}`).innerHTML = "";
        }
        x++;
    }
    pageIndex++;
}
//page changing for transaction table
async function prevPage()
{
    let x = 0;
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && 1 + pageIndex * 5 - 10 >= 0) {
            document.getElementById(`recentDoc${i}`).innerHTML = `Document ID: ${transactions[i + pageIndex * 5 - 10].documentID} sent on ${transactions[i + pageIndex * 5 - 10].time}<br></br>`;
        }
        x++;
    }
    if (pageIndex === 1)
    {
        return;
    }
    pageIndex--;
    if (pageIndex == 1)
    {
    }
}
//page changing for blockchain table
async function nextBlock()
{
    if (blockIndex === 0)
    {
        return;
    }
    else
    {
        blockIndex--;
        document.getElementById("recentBlock").innerHTML = `Block Hash: ${blockchain.chain[blockIndex].hash}<br></br>Index: ${blockchain.chain[blockIndex].index}<br></br>Nonce: ${blockchain.chain[blockIndex].nonce}<br></br>Previous Block Hash: ${blockchain.chain[blockIndex].previousBlockHash}<br></br>Time Stamp: ${blockchain.chain[blockIndex].timestamp}`;
    }
}
//page changing for blockchain table
async function prevBlock()
{

    if (blockIndex === lastBlock)
    {
        return;
    }
    else
    {
        blockIndex++;
        document.getElementById("recentBlock").innerHTML = `Block Hash: ${blockchain.chain[blockIndex].hash}<br></br>Index: ${blockchain.chain[blockIndex].index}<br></br>Nonce: ${blockchain.chain[blockIndex].nonce}<br></br>Previous Block Hash: ${blockchain.chain[blockIndex].previousBlockHash}<br></br>Time Stamp: ${blockchain.chain[blockIndex].timestamp}`;
    }
}
//file upload functionality, generates the hash of the uploaded pdf and checks if it matches 1 in the transaction database table
async function checkFile() {
    let input = document.getElementById("fileUpload").files;
    let fileData = new Blob([input[0]]);
    let reader = new FileReader();
    reader.readAsArrayBuffer(fileData);
    reader.onload = async function () {
        let arrayBuffer = reader.result
        let bytes = new Uint8Array(arrayBuffer);
        const hash = sha256(bytes);
        axios.post("/admin/getTransactionByHash", {
                hash: hash
            }
        ).then((response) => {
            if (response.data.documentID !== undefined) {
                var wfVariables_formatted = "<br></br>"
                // declare a local variable for holding the data in response. This is for manipulation and formatting of the string
                let wfVars = JSON.parse(response.data.wfVariables, (key, value) => {
                    if(typeof key == "string") {
                        if(typeof value == "string") {
                            wfVariables_formatted = wfVariables_formatted.concat("<i>")
                            wfVariables_formatted = wfVariables_formatted.concat(key)
                            wfVariables_formatted = wfVariables_formatted.concat(":</i> ")
                            wfVariables_formatted = wfVariables_formatted.concat(value)
                            wfVariables_formatted = wfVariables_formatted.concat("<br></br>")
                        }
                    }
                });
                document.getElementById("searchResult").innerHTML = `<u>Results for Uploaded File</u><br></br>`;
                document.getElementById("docID").innerHTML = `<b>Document ID:</b> ${response.data.documentID}<br></br>`;
                document.getElementById("hash").innerHTML = `<b>Hash of Document:</b> ${response.data.hash}<br></br>`;
                document.getElementById("docTime").innerHTML = `<b>Date and Time of Document:</b> ${(response.data.time)}<br></br>`;
                document.getElementById("transID").innerHTML = `<b>Transaction ID:</b> ${response.data.transactionID}<br></br>`;
                document.getElementById("wfVar").innerHTML = `<b>Workflow Variables:</b> ${wfVariables_formatted}`;
                document.getElementById("searchTable").style.display = "table";
                document.getElementById("searchNotFound").style.display = "none";
                document.getElementById("notHashID").style.display = "none";
            }
            else
            {

                document.getElementById("notHashID").innerHTML = "File Was Not Found In The Blockchain";
                document.getElementById("notHashID").style.display = "flex";
                document.getElementById("searchTable").style.display = "none";
                document.getElementById("searchNotFound").style.display = "none";

            }
        })
    }
}
//search for a hash, documentID and display the search
async function displaySearch()
{
    const input = document.getElementById("searchText").value;
    axios.post("/admin/searchTransaction", {
            hash: input,
            documentID: input
        }
    ).then((response) => {
        if (response.data === "Not Found" || response.data === "error") {
            document.getElementById("searchNotFound").innerHTML = `No Results Found for '${input}'`;
            document.getElementById("searchNotFound").style.display = "flex";
            document.getElementById("searchTable").style.display = "none";
            document.getElementById("notHashID").style.display = "none";
        }
        else
        {
            var wfVariables_formatted = "<br></br>"
            // declare a local variable for holding the data in response. This is for manipulation and formatting of the string
            let wfVars = JSON.parse(response.data.wfVariables, (key, value) => {
                if(typeof key == "string") {
                    if(typeof value == "string") {
                        wfVariables_formatted = wfVariables_formatted.concat("<i>")
                        wfVariables_formatted = wfVariables_formatted.concat(key)
                        wfVariables_formatted = wfVariables_formatted.concat(":</i> ")
                        wfVariables_formatted = wfVariables_formatted.concat(value)
                        wfVariables_formatted = wfVariables_formatted.concat("<br></br>")
                    }
                }
            });
            document.getElementById("searchResult").innerHTML = `<u>Results for '${input}'</u><br></br>`;
            document.getElementById("docID").innerHTML = `<b>Document ID:</b> ${response.data.documentID}<br></br>`;
            document.getElementById("hash").innerHTML = `<b>Hash of Document:</b> ${response.data.hash}<br></br>`;
            document.getElementById("docTime").innerHTML = `<b>Date and Time of Document:</b> ${response.data.time}<br></br>`;
            document.getElementById("transID").innerHTML = `<b>Transaction ID:</b> ${response.data.transactionID}<br></br>`;
            document.getElementById("wfVar").innerHTML = `<b>Workflow Variables:</b> ${wfVariables_formatted}`;
            document.getElementById("searchTable").style.display = "table";
            document.getElementById("searchNotFound").style.display = "none";
        }
    })
}
//function called when update blockchain is clicked, only used when blockchain is empty
async function updateBlockchain()
{
    await axios.get("/blockchain/updateTransactions");
    window.location.reload();
}
async function clickDocIdToDisplayInfo(val)
{
    var wfVariables_formatted = "<br></br>"
    // declare a local variable for holding the data in response. This is for manipulation and formatting of the string
    let wfVars = JSON.parse(transactions[pageIndex * 5 - 5 + val].wfVariables, (key, value) => {
        if(typeof key == "string") {
            if(typeof value == "string") {
                wfVariables_formatted = wfVariables_formatted.concat("<i>")
                wfVariables_formatted = wfVariables_formatted.concat(key)
                wfVariables_formatted = wfVariables_formatted.concat(":</i> ")
                wfVariables_formatted = wfVariables_formatted.concat(value)
                wfVariables_formatted = wfVariables_formatted.concat("<br></br>")
            }
        }
    });
    document.getElementById("searchResult").innerHTML = `<u>Results for '${transactions[pageIndex * 5 - 5 + val].documentID}'</u><br></br>`;
    document.getElementById("docID").innerHTML = `<b>Document ID:</b> ${transactions[pageIndex * 5 - 5 + val].documentID}<br></br>`;
    document.getElementById("hash").innerHTML = `<b>Hash of Document:</b> ${transactions[pageIndex * 5 - 5 + val].hash}<br></br>`;
    document.getElementById("docTime").innerHTML = `<b>Date and Time of Document:</b> ${transactions[pageIndex * 5 - 5 + val].time}<br></br>`;
    document.getElementById("transID").innerHTML = `<b>Transaction ID:</b> ${transactions[pageIndex * 5 - 5 + val.transactionID]}<br></br>`;
    document.getElementById("wfVar").innerHTML = `<b>Workflow Variables:</b> ${wfVariables_formatted}`;
    document.getElementById("searchTable").style.display = "table";
    document.getElementById("searchNotFound").style.display = "none";
}
getLatestTransactions();
getLatestBlocks();