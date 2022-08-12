const axios = require("axios");
document.getElementById('previousPage').addEventListener('click', prevPage);
document.getElementById('nextPage').addEventListener('click', nextPage);
document.getElementById("searchBtn").addEventListener('click', displaySearch);
document.getElementById("previousSearch").addEventListener('click', prevSearch);
document.getElementById("nextSearch").addEventListener('click', nextSearch);
let searchIndex = 1;
let lastSearch = 0;
let pageIndex = 1;
let lastPage = 0;
let logs = new Array();
let search = new Array();
let searchBool = false;
//on load get the latest transaction logs and display as table
async function getLatestLogs()
{
    axios.get("/admin/getLatestLogs"
    ).then(res => {
        logs = res.data;
        let x = 0;
        lastPage = Math.ceil(logs.length / 5);
        for (let i = 0; i < logs.length; i++)
        {
            if (x < 5 && logs[i].username !== undefined)
                if (logs[i].transaction_description.includes("failed") || logs[i].transaction_description.includes("Timeout"))
                {
                    document.getElementById(`recentLog${i}`).innerHTML = `${logs[i].transaction_description}<br></br>`;
                    document.getElementById(`recentLog${i}`).style.color = '#CA463E';
                }
                else {
                    document.getElementById(`recentLog${i}`).innerHTML = `${logs[i].transaction_description}<br></br>`;
                    document.getElementById(`recentLog${i}`).style.color = '#38733C';
                }
            x++;
        }
        document.getElementById("latestLogs").style.display = "table";
        document.getElementById("previousPage").style.display = "inline";
        document.getElementById("nextPage").style.display = "inline";
        return logs;
    }).catch(error => {
        console.log(error);
    })
}
//change transaction log table pages
async function nextPage()
{
    let x = 0;
    if (pageIndex == lastPage)
    {
        return;
    }
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && ((i + pageIndex * 5) < logs.length)) {
            if (logs[i + pageIndex * 5].transaction_description.includes("failed") || logs[i + pageIndex * 5].transaction_description.includes("Timeout"))
            {
                document.getElementById(`recentLog${i}`).innerHTML = `${logs[i + pageIndex * 5].transaction_description}<br></br>`;
                document.getElementById(`recentLog${i}`).style.color = '#CA463E';
            }
            else
            {
                document.getElementById(`recentLog${i}`).innerHTML = `${logs[i + pageIndex * 5].transaction_description}<br></br>`;
                document.getElementById(`recentLog${i}`).style.color = '#38733C';
            }
        }
        else {
            document.getElementById(`recentLog${i}`).innerHTML = "";
        }
        x++;
    }
    pageIndex++;
}
//change transaction log table pages
async function prevPage()
{
    let x = 0;
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && 1 + pageIndex * 5 - 10 >= 0)
        {
            if (logs[i + pageIndex * 5 - 10].transaction_description.includes("failed") || logs[i + pageIndex * 5 - 10].transaction_description.includes("Timeout"))
            {
                document.getElementById(`recentLog${i}`).innerHTML = `${logs[i + pageIndex * 5 - 10].transaction_description}<br></br>`;
                document.getElementById(`recentLog${i}`).style.color = '#CA463E';
            }
            else
            {
                document.getElementById(`recentLog${i}`).innerHTML = `${logs[i + pageIndex * 5 - 10].transaction_description}<br></br>`;
                document.getElementById(`recentLog${i}`).style.color = '#38733C';
            }
        }
        x++;
    }
    if (pageIndex === 1)
    {
        return;
    }
    pageIndex--;
}
//display the searched information if it exists in the database
async function displaySearch()
{
    searchBool = false;
    let input = document.getElementById("searchText").value;
    axios.post("/admin/getGroupIdWithGroupName",{
        group_name: input
    }
    ).then((response) => {
        if(response.data.id != undefined) {
            console.log(response.data.id);
            input = response.data.id;
            searchBool = true;
        }
        axios.post("/admin/getUserIdWithEmail", {
            email: input
        }
        ).then((response) => {
            if(response.data.id != undefined) {
                console.log(response.data.id);
                input = response.data.id;
                searchBool = true;
            }
            if (searchBool != false)
            {
                axios.post("/admin/searchLog", {
                        search: input
                    }
                ).then((response) => {
                    if (response.data === "Not Found" || response.data === "error") {
                        document.getElementById("searchNotFound").innerHTML = `No Results Found for '${document.getElementById("searchText").value}'`;
                        document.getElementById("searchNotFound").style.display = "flex";
                        document.getElementById("searchTable").style.display = "none";
                        document.getElementById("nextSearch").style.display = "none";
                        document.getElementById("previousSearch").style.display = "none";
                    } else {
                        search = response.data;
                        let x = 0;
                        lastSearch = Math.ceil(search.length / 5);
                        document.getElementById("results").innerHTML = `<u>Results for '${document.getElementById("searchText").value}'</u><br></br>`;
                        for (let i = 0; i < search.length; i++) {
                            if (x < 5 && search[i].transaction_description !== undefined) {
                                if (search[i].transaction_description.includes("failed") || search[i].transaction_description.includes("Timeout")) {
                                    document.getElementById(`result${i}`).innerHTML = `${search[i].transaction_description}<br></br>`;
                                    document.getElementById(`result${i}`).style.color = '#CA463E';
                                } else {
                                    document.getElementById(`result${i}`).innerHTML = `${search[i].transaction_description}<br></br>`;
                                    document.getElementById(`result${i}`).style.color = '#38733C';
                                }
                            }
                            x++
                        }
                        document.getElementById("searchTable").style.display = "table";
                        document.getElementById("searchNotFound").style.display = "none";
                        document.getElementById("previousSearch").style.display = "inline";
                        document.getElementById("nextSearch").style.display = "inline";
                        return search;
                    }
                });
            }
            else
            {
                document.getElementById("searchNotFound").innerHTML = `No Results Found for '${document.getElementById("searchText").value}'`;
                document.getElementById("searchNotFound").style.display = "flex";
                document.getElementById("searchTable").style.display = "none";
                document.getElementById("nextSearch").style.display = "none";
                document.getElementById("previousSearch").style.display = "none";
            }
        });
    });
}
//search table page changing
async function nextSearch()
{
    let x = 0;
    if (searchIndex == lastSearch)
    {
        return;
    }
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && ((i + searchIndex * 5) < search.length)) {
            if (search[i + searchIndex * 5].transaction_description.includes("failed") || search[i + searchIndex * 5].transaction_description.includes("Timeout"))
            {
                document.getElementById(`result${i}`).innerHTML = `${search[i + searchIndex * 5].transaction_description}<br></br>`;
                document.getElementById(`result${i}`).style.color = '#CA463E';
            }
            else
            {
                document.getElementById(`result${i}`).innerHTML = `${search[i + searchIndex * 5].transaction_description}<br></br>`;
                document.getElementById(`result${i}`).style.color = '#38733C';
            }
        }
        else
        {
            document.getElementById(`result${i}`).innerHTML = "";
        }
        x++;
    }
    searchIndex++;
}
//search table page changing
async function prevSearch()
{
    let x = 0;
    for (let i = 0; i < 5; i++)
    {
        if (x < 5 && 1 + searchIndex * 5 - 10 >= 0)
        {
            if (search[i + searchIndex * 5 - 10].transaction_description.includes("failed") || search[i + searchIndex * 5 - 10].transaction_description.includes("Timeout"))
            {
                document.getElementById(`result${i}`).innerHTML = `${search[i + searchIndex * 5 - 10].transaction_description}<br></br>`;
                document.getElementById(`result${i}`).style.color = '#CA463E';
            }
            else
            {
                document.getElementById(`result${i}`).innerHTML = `${search[i + searchIndex * 5 - 10].transaction_description}<br></br>`;
                document.getElementById(`result${i}`).style.color = '#38733C';
            }
        }
        x++;
    }
    if (searchIndex === 1)
    {
        return;
    }
    searchIndex--;
}
getLatestLogs();