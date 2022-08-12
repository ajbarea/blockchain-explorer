const axios = require('axios');
const sha256 = require('sha256');
let btn = document.getElementById('signIn');
let altBtn = document.getElementById('altLogin-btn')
let adminEmail = document.getElementById('adminEmail')
let adminPassword = document.getElementById('adminPassword')
let loginResult = document.getElementById('result')
loginResult.hidden = true;
//called on load of page, if no local storage of token do nothing, if there is update the token then redirect to the metricsPage
document.getElementById("guestLogin").addEventListener('click', function()
{
    window.location.href = "/admin/userBlockchainExp";
})
async function checkInfo()
{
    const token = window.localStorage.getItem('token');
    if (token === null)
    {
        return;
    }
    else {
        axios.get("/admin/tokenCheck",
            {
                headers:
                    {
                        "Authorization": token
                    }
            }
        ).then(res => {
            console.log(res);
            //if (res.status === "success")
            window.location.href = "/admin/MetricsPage";
        }).catch(error => {
            if (error.response.status === 401)
            {
                window.localStorage.setItem('token', error.response.data);
                console.log(error.response.data);
                window.location.href = "/admin/MetricsPage";
            }
        })
    }
}
checkInfo();
//when clicking on login, if token is null go through the oauth process, otherwise update the token and redirect
async function oAuth()
{
    const token = window.localStorage.getItem('token');
    if (token === null) {
        await axios.get("/admin/getAuthURL").then(res => {
            window.close();
            window.location.href = (res.data);
        })
    }
    else {
        axios.get("/admin/tokenCheck",
            {
                headers:
                    {
                        "Authorization": token
                    }
            }
        ).then(res => {
        }).catch(error => {
            if (error.response.status === 401) {
                window.localStorage.setItem('token', error.response.data);
                console.log(error.response.data);
                window.location.href = "/admin/MetricsPage";
            }
        })
    }
}

async function login() {
    const token = window.localStorage.getItem('token');
    let password = sha256(adminPassword.value);
    if (token === null) {
        await axios.post("/admin/findAdminAccount",
            {
                user_email: adminEmail.value,
                user_password: password
            }).then(res =>{
                if(res.data === true) {
                    window.location.href = "/admin/MetricsPage";
                } else {
                    loginResult.hidden = false;
                }
        })
    }
}
btn.addEventListener('click', oAuth);
altBtn.addEventListener('click', login)




