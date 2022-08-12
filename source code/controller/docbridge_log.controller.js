const mySkyway = require("../database/skyway");
const docbridge_log = mySkyway.models["docbridge_log"];

const docbridgeLogController = {
    addLog: async (req, res) => {
        try{
            let results = await docbridge_log.create({log_time:req.body.log_time, username:req.body.username, transaction_type: req.body.transaction_type, transaction_typename:req.body.transaction_typename, transaction_description:req.body.transaction_description, groupname: req.body.groupname, grouptoken: req.body.grouptoken, workflowID: req.body.workflowID, webhookURL: req.body.webhookURL, group_id: req.body.group_id, user_id: req.body.user_id});
            if(results !== null && results.username === req.body.username){
                res.send(200);
            }else{
                return {status:"failed", data: `Failed to create log`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to create log"};
        }
    },
    getLatestLogs: async (req, res) => {
        try{
            let temp = new Array();
            let results = await docbridge_log.findAll();
            let x = 0;
            if (results.length >= 1) {
                for (let i = results.length - 1; i >= 0; i--) {
                    temp[x] = results[i];
                    x++;
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
    searchLog: async (req, res) => {
        try{
            let results = await docbridge_log.findAll({where: {user_id:req.body.search}})
            if(results != ""){
                res.status(200).send(results);
            }else{
                let results = await docbridge_log.findAll({where: {group_id:req.body.search}})
                if(results != ""){
                    res.status(200).send(results);
                }else{
                    res.status(400).send("Not Found")
                }
            }
        }catch(error){
            res.status(400).send("error");
        }
    },
    deleteLog: async (username) => {
        try{
            let results = await docbridge_log.destroy({where: {username:username}});
            return {status:"success", data: results};
        }catch(error){
            return {status:"error", data: error.message || "Unable to destroy user"};
        }
    },
    getThisMonthDocsSent: async (req, res) => {
        try{
            let temp = new Array();
            let date = new Date();
            let firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            let lastDayOfThisMonth = new Date(date.getFullYear(), date.getMonth() +1, 0);

            let results = await docbridge_log.findAll({where: {transaction_type:4}});
            let x = 0;
            if (results.length >= 1) {
                for (let i = results.length - 1; i >= 0; i--) {
                    if (results[i].log_time <= lastDayOfThisMonth && results[i].log_time >= firstDayOfThisMonth) {
                        temp[x] = results[i];
                        x++;
                    }
                }
                console.log(temp);
                res.status(200).send(temp);
            }
            else{
                res.status(400).send("failed");
            }
        }catch(error){
            res.status(400).send("error");
        }
    },
    getPrevMonthDocsSent: async (req, res) => {
        try{
            let temp = new Array();
            let date = new Date();
            let firstDayOfLastMonth = new Date(date.getFullYear(), date.getMonth() -1, 1);
            let lastDayOfLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);

            let results = await docbridge_log.findAll({where: {transaction_type:4}});
            let x = 0;
            if (results.length >= 1) {
                for (let i = results.length - 1; i >= 0; i--) {
                    if (results[i].log_time <= lastDayOfLastMonth && results[i].log_time >= firstDayOfLastMonth) {
                        temp[x] = results[i];
                        x++;
                    }
                }
                console.log(temp);
                res.status(200).send(temp);
            }
            else{
                res.status(400).send("failed");
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
            let results = await docbridge_log.findAll({where: {transaction_type:4}});
            let x = 0;
            let y = 0;
            let z = 0;
            let j = 0;
            let matrix = new Array(4).fill(0).map(() => new Array());
            if (results.length >= 1) {
                for (let i = results.length - 1; i >= 0; i--) {
                    if (results[i].log_time <= secondWeekOfThisMonth && results[i].log_time >= firstDayOfThisMonth) {
                        matrix[0][x] = results[i];
                        x++;
                    }
                    if (results[i].log_time <= thirdWeekOfThisMonth && results[i].log_time >= secondWeekOfThisMonth) {
                        matrix[1][y] = results[i];
                        y++;
                    }
                    if (results[i].log_time <= forthWeekOfThisMonth && results[i].log_time >= thirdWeekOfThisMonth) {
                        matrix[2][z] = results[i];
                        z++;
                    }
                    if (results[i].log_time <= lastDayOfThisMonth && results[i].log_time >= forthWeekOfThisMonth) {
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
            let results = await docbridge_log.findAll({where: {transaction_type:4}});
            let x = 0;
            let y = 0;
            let z = 0;
            let j = 0;
            let matrix = new Array(4).fill(0).map(() => new Array());
            if (results.length >= 1) {
                for (let i = results.length - 1; i >= 0; i--) {
                    if (results[i].log_time <= secondWeekOfLastMonth && results[i].log_time >= firstDayOfLastMonth) {
                        matrix[0][x] = results[i];
                        x++;
                    }
                    if (results[i].log_time <= thirdWeekOfLastMonth && results[i].log_time >= secondWeekOfLastMonth) {
                        matrix[1][y] = results[i];
                        y++;
                    }
                    if (results[i].log_time <= forthWeekOfLastMonth && results[i].log_time >= thirdWeekOfLastMonth) {
                        matrix[2][z] = results[i];
                        z++;
                    }
                    if (results[i].log_time <= lastDayOfLastMonth && results[i].log_time >= forthWeekOfLastMonth) {
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
module.exports = docbridgeLogController;
