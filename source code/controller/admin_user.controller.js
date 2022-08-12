let mySkyway = require("../database/skyway");
const OAuthController = require("../controllers/oauthclient");
const adminUser = mySkyway.models["admin_user"];

const AdminUserController = {
    findAdminAccount: async (req, res) => {
        // check passed username and password, if it matches then respond with token, otherwise "FAIL"
        try {
            let results = await adminUser.findAll();
            let found = false
            for(let i = 0; i < results.length; i++) {
                if((results[i].email === req.body.user_email) & (results[i].password === req.body.user_password) ) found= true;
            }
            res.send(found)
        } catch(error) {
            res.send("Failed to find user.")
        }
    },
    getUserByEmail: async (email) => {
        try{
            let results = await adminUser.findOne({where: {email:email}})
            if(results){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to find user ${email}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to find user"};
        }
    },
    addUser: async (email, firstname, lastname, refresh_token, token, expiresIn) => {
        try{
            let results = await adminUser.create({email:email, first_name:firstname, last_name:lastname, refresh_token:refresh_token, token:token, expiresIn:expiresIn})
            if(results !== null && results.email === email){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to create user ${email}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to create user"};
        }
    },
    updateRefreshToken: async (email, refresh_token) => {
        try{
            let results = await adminUser.update({refresh_token:refresh_token},{where: {email:email}})
            if(results !== null && results[0] >= 1){
                return {status:"success", data: results[0]};
            }else{
                return {status:"failed", data: `Failed to update refresh token for ${email}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to update user"};
        }
    },
    updateToken: async (email, token) => {
        try{
            let results = await adminUser.update({token:token},{where: {email:email}})
            if(results !== null && results[0] >= 1){
                return {status:"success", data: results[0]};
            }else{
                return {status:"failed", data: `Failed to update token for ${email}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to update user"};
        }
    },
    updateExpire: async (email, exp) => {
        try{
            let results = await adminUser.update({expiresIn:exp},{where: {email:email}})
            if(results !== null && results[0] >= 1){
                return {status:"success", data: results[0]};
            }else{
                return {status:"failed", data: `Failed to update expire for ${email}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to update user"};
        }
    },
    getAllAdminAccounts: async (req, res) => {
        try
        {
            let results = await adminUser.findAll();
            if (results !== null)
            {
                res.status(200).send(results);
            }
            else
            {
                res.status(400).send("failed");
            }
        }
        catch(error)
        {
            res.status(400).send("error");
        }
    },
    addUserFromDashboard: async (req, res) => {
        try{
            let results = await adminUser.create({email:req.body.email, first_name:req.body.firstname, last_name:req.body.lastname, expiresIn:0, password: req.body.password})
            if(results !== null && results.email === req.body.email){
                res.status(200).send("Success");
            }else{
                res.status(400).send("Failed");
            }
        }catch(error){
            res.status(400).send(`${error}`);
        }
    },
    editUserFromDashboard: async (req, res) => {
        try{
            let results;
            if (req.body.newFirstname !== "")
                results = await adminUser.update({first_name:req.body.newFirstname},{where: {email:req.body.email}})
            if (req.body.newLastname !== "")
                results = await adminUser.update({last_name:req.body.newLastname},{where: {email:req.body.email}})
            if (req.body.newEmail !== "")
                results = await adminUser.update({email:req.body.newEmail},{where: {email:req.body.email}})
            if(results !== null && results[0] >= 1){
                res.status(200).send("Success");
            }else{
                res.status(400).send("Failed");
            }
        }catch(error){
            res.status(400).send(`${error}`);
        }
    },
    deleteUserFromDashboard: async (req, res) => {
        try{
            let results = await adminUser.destroy({where: {email:req.body.deleteEmail}});
            if(results !== null && results >= 1) {
                res.status(200).send("Success");
            }
            else
            {
                res.status(400).send("Failed");
            }
        }catch(error){
            res.status(400).send(`${error}`);
        }
    },
    deleteUser: async (email) => {
        try{
            let results = await adminUser.destroy({where: {email:email}})
            return {status:"success", data: results};
        }catch(error){
            return {status:"error", data: error.message || "Unable to destroy user"};
        }
    }
    /*, old password check, not used
    passwordCheck: async (req, res) => {
        try{
            let results = await adminUser.findOne({where: {email:req.body.username}})
            if(results.temp_password === req.body.password){
                res.send("success");
            }else{
                res.send("failed");
            }
        }catch(error){
            res.send("error");
        }
    }*/
}
module.exports = AdminUserController;
