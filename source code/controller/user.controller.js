let mySkyway = require("../database/skyway");
const WorkflowController = require("./workflow.controller");
const GroupController = require("./group.controller");
const {createToken} = require("../validation/jwtValidate");

const user = mySkyway.models["user"];

const UserController = { //TEST commit
    addUser: async (email, firstname, lastname, refresh_token, token, expiresIn) => {
        try{
            let results = await user.create({email:email, first_name:firstname, last_name:lastname, refresh_token:refresh_token, token:token, expiresIn:expiresIn})
            if(results !== null && results.email === email){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to create user ${email}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to create user"};
        }
    },
    deleteUser: async (email) => {
        try{
            let results = await user.destroy({where: {email:email}})
            return {status:"success", data: results};
        }catch(error){
            return {status:"error", data: error.message || "Unable to destroy user"};
        }
    },
    getUserByEmail: async (email) => {
        try{
            let results = await user.findOne({where: {email:email}})
            if(results){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to find user ${email}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to find user"};
        }
    },
    getUserById: async (id) => {
        try{
            let results = await user.findOne({where: {id:id}})
            if(results){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to find user ${id}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to find user"};
        }
    },
    updateRefreshToken: async (email, refresh_token) => {
        try{
            let results = await user.update({refresh_token:refresh_token},{where: {email:email}})
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
            let results = await user.update({token:token},{where: {email:email}})
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
            let results = await user.update({expiresIn:exp},{where: {email:email}})
            if(results !== null && results[0] >= 1){
                return {status:"success", data: results[0]};
            }else{
                return {status:"failed", data: `Failed to update expire for ${email}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to update user"};
        }
    },
    getAllUserData: async (req, res) => {
        let groups, workflows, userInfo = [], groupList = [], flag = false;

        let response = {
            status: function (value) {
                if (value !== 401) {
                    res.status(value).send("Did not grab all groups");
                } else {
                    groups = "";
                    flag = true;
                    return this
                }
            },
            send: function (value) {
                if (!flag) {
                    groups = value;
                }
                return this
            }
        };
        await GroupController.getGroups(req, response);
        response = {
            status: function (value) {
                if (value !== 401) {
                    res.status(value).send("Did not grab all workflows");
                } else {
                    workflows = "";
                    flag = true;
                    return this
                }
            },
            send: function (value) {
                if (!flag) {
                    workflows = value;
                }
                return this
            }
        };
        console.log(groups);
        if (groups !== "") {
            for (let x in groups) {
                req.params.apiKey = groups[x].API_key;
                await WorkflowController.getWorkflows(req, response);
                groupList.push({
                    group: groups[x],
                    workflows: workflows
                });
            }
        }
        userInfo.push({
            user: req.locals,
            groups: groupList
        });
        res.send(userInfo[0]);
    },
    getAllUserAccounts: async (req, res) => {
        try
        {
            let results = await user.findAll();
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
            let results = await user.create({email:req.body.email, first_name:req.body.firstname, last_name:req.body.lastname, expiresIn:0})
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
                results = await user.update({first_name:req.body.newFirstname},{where: {email:req.body.email}})
            if (req.body.newLastname !== "")
                results = await user.update({last_name:req.body.newLastname},{where: {email:req.body.email}})
            if (req.body.newEmail !== "")
                results = await user.update({email:req.body.newEmail},{where: {email:req.body.email}})
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
            let results = await user.destroy({where: {email:req.body.deleteEmail}});
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
    getTokenOfUser: async (req, res) => {
        try
        {
            let tokenString;
            let results = await user.findOne({where: {email: req.body.email}});
            if (results !== null)
            {
                tokenString = results.token;
                let user_token = createToken(req.body.email,tokenString);
                res.status(200).send(user_token);
            }
            else
            {
                res.status(400).send(`Failed`);
            }
        }catch(error)
        {
            res.status(400).send(`${error}`);
        }
    },
    getUserIdWithEmail: async (req, res) => {
        try
        {
            let results = await user.findOne({where: {email: req.body.email}});
            if (results !== null)
            {
                res.status(200).send(results);
            }
            else
            {
                res.send(`Failed`);
            }
        }catch(error)
        {
            res.send(`${error}`);
        }
    }
}
module.exports = UserController;
