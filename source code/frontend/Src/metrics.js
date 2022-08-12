const axios = require("axios");
let Highcharts = require('highcharts');
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);
let thisMonth;
let lastMonth;
let thisLog;
let lastLog;
let userCount;
let documentCount;
let thisMonthByWeek;
let lastMonthByWeek;
let thisLogByWeek;
let lastLogByWeek;
//redirect to user page when clicked
document.getElementById("userCard").addEventListener('click', function()
{
    window.location.href='UsersPage';
})
//redirect to blockchain explorer when clicked
document.getElementById("documentCard").addEventListener('click', function()
{
    window.location.href='BlockchainExpPage';
})
document.getElementById("weekCard").addEventListener('click', function()
{
    document.getElementById("weekChart").style.display = "block";
    document.getElementById("chart").style.display = "none";
})
//redirect to blockchain explorer when clicked
document.getElementById("monthCard").addEventListener('click', function()
{
    document.getElementById("weekChart").style.display = "none";
    document.getElementById("chart").style.display = "block";
})
//on load of the page, get data for the chart then display the chart
document.addEventListener('DOMContentLoaded', function () {
    axios.get("/admin/getThisMonthTransactions"
    ).then(res => {
        thisMonth = res.data;
        axios.get("/admin/getPrevMonthTransactions"
        ).then(res => {
            lastMonth = res.data;
            axios.get("/admin/getThisMonthDocsSent"
            ).then(res => {
                thisLog = res.data;
                axios.get("/admin/getPrevMonthDocsSent"
                ).then(res => {
                    lastLog = res.data;
                    let date = new Date();
                    let month;
                    let lastMonthName;
                    let firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                    if (firstDayOfThisMonth.getMonth() === 0)
                    {
                        month = 'January';
                        lastMonthName = 'December';
                    }
                    else if (firstDayOfThisMonth.getMonth() === 1)
                    {
                        month = 'February';
                        lastMonthName = 'January';
                    }
                    else if (firstDayOfThisMonth.getMonth() === 2)
                    {
                        month = 'March';
                        lastMonthName = 'February';
                    }
                    else if (firstDayOfThisMonth.getMonth() === 3)
                    {
                        month = 'April';
                        lastMonthName = 'March';
                    }
                    else if (firstDayOfThisMonth.getMonth() === 4)
                    {
                        month = 'May';
                        lastMonthName = 'April';
                    }
                    else if (firstDayOfThisMonth.getMonth() === 5)
                    {
                        month = 'June';
                        lastMonthName = 'May';
                    }
                    else if (firstDayOfThisMonth.getMonth() === 6)
                    {
                        month = 'July';
                        lastMonthName = 'June';
                    }
                    else if (firstDayOfThisMonth.getMonth() === 7)
                    {
                        month = 'August';
                        lastMonthName = 'July';
                    }
                    else if (firstDayOfThisMonth.getMonth() === 8)
                    {
                        month = 'September'
                        lastMonthName = 'August';
                    }
                    else if (firstDayOfThisMonth.getMonth() === 9)
                    {
                        month = 'October';
                        lastMonthName = 'September';
                    }
                    else if (firstDayOfThisMonth.getMonth() === 10)
                    {
                        month = 'November';
                        lastMonthName = 'October';
                    }
                    else if (firstDayOfThisMonth.getMonth() === 11)
                    {
                        month = 'December';
                        lastMonthName = 'November';
                    }
                    const chart = Highcharts.chart('chart', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            style:
                                {
                                    color: '#38733C',
                                },
                            text: 'Documents Sent in Previous Months'
                        },
                        xAxis: {
                            categories: [lastMonthName, month]
                        },
                        yAxis: {
                            title: {
                                text: 'Number of Documents Sent'
                            }
                        },
                        series: [{
                            name: 'Documents Stored In Blockchain',
                            color: '#38733C',
                            data: [lastMonth.length, thisMonth.length]
                        }, {
                            name: 'Workflows Started',
                            color: '#28A3CD',
                            data: [lastLog.length, thisLog.length]
                        }]
                    });
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        }).catch(error => {
            console.log(error);
        });
    }).catch(error => {
        console.log(error);
    });
});
document.addEventListener('DOMContentLoaded', function () {
    axios.get("/admin/getPrevMonthByWeek"
    ).then(res => {
            lastMonthByWeek = res.data;
            axios.get("/admin/getThisMonthByWeek"
            ).then(res => {
                thisMonthByWeek = res.data;
                axios.get("/admin/getThisMonthDocsSentByWeek"
                ).then(res => {
                    thisLogByWeek = res.data;
                    axios.get("/admin/getPrevMonthDocsSentByWeek"
                    ).then(res => {
                        lastLogByWeek = res.data;
                        let date = new Date();
                        let firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1).toDateString();
                        let secondWeekOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1 + 7).toDateString();
                        let thirdWeekOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1 + 14).toDateString();
                        let forthWeekOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1 + 21).toDateString();
                        let firstDayOfLastMonth = new Date(date.getFullYear(), date.getMonth() -1, 1).toDateString();
                        let secondWeekOfLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1 + 7).toDateString();
                        let thirdWeekOfLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1 + 14).toDateString();
                        let forthWeekOfLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1 + 21).toDateString();
                        const weekChart = Highcharts.chart('weekChart', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                style:
                                    {
                                        color: '#38733C',
                                    },
                                text: 'Documents Sent in Previous Months'
                            },
                            xAxis: {
                                categories: [firstDayOfLastMonth, secondWeekOfLastMonth, thirdWeekOfLastMonth, forthWeekOfLastMonth, firstDayOfThisMonth, secondWeekOfThisMonth, thirdWeekOfThisMonth, forthWeekOfThisMonth]
                            },
                            yAxis: {
                                title: {
                                    text: 'Number of Documents Sent'
                                }
                            },
                            series: [{
                                name: 'Documents Stored In Blockchain',
                                color: '#38733C',
                                data: [lastMonthByWeek[0].length, lastMonthByWeek[1].length, lastMonthByWeek[2].length, lastMonthByWeek[3].length, thisMonthByWeek[0].length, thisMonthByWeek[1].length, thisMonthByWeek[2].length, thisMonthByWeek[3].length]
                            }, {
                            name: 'Workflows Started',
                                color: '#28A3CD',
                                data: [lastLogByWeek[0].length, lastLogByWeek[1].length, lastLogByWeek[2].length, lastLogByWeek[3].length, thisLogByWeek[0].length, thisLogByWeek[1].length, thisLogByWeek[2].length, thisLogByWeek[3].length]
                            }]
                        });
                        document.getElementById('weekChart').style.display = "block";
                    }).catch(error => {
                    console.log(error);
                    });
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
    }).catch(error => {
        console.log(error);
    });
});

//when loaded, get information for the cards and display it
async function loadCards()
{
    await axios.get("/admin/getAllUserAccounts"
    ).then(res => {
        userCount = res.data.length;
        document.getElementById("userCount").innerHTML = userCount;
    }).catch(error => {
        console.log(error);
    });
    await axios.get("/admin/getLatestTransactions"
    ).then(res => {
        documentCount = res.data.length;
        document.getElementById("documentCount").innerHTML = documentCount;
    }).catch(error => {
        console.log(error);
    });
}
loadCards();
