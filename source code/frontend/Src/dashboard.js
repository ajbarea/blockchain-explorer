const axios = require('axios');
const params = new URLSearchParams(window.location.search);
//after logging in to the metrics page, check if the url has token and expiresIn, if there is store it in the local storage of the browser
let token = params.get("token");
let expire = params.get("expiresIn");
if (token !== null) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('expiresIn', expire);
}
