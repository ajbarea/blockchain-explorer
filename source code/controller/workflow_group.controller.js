let mySkyway = require("../database/skyway")
let {Op} = require("sequelize")
const workflowGroup = mySkyway.models["workflow_group"];

const WorkflowGroupController = {
    addWorkflowGroup: async (apiKey, groupName, userID) => {
        try{
            let results = await mySkyway.models["workflow_group"].create({API_key: apiKey,group_name: groupName , user_id:userID})
            if(results !== null && results.group_name === groupName){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to create workflow_group`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to create workflow_group"};
        }
    },
    deleteWorkflowGroup: async (apiKey, userID) => {
        try{
            let results = await mySkyway.models["workflow_group"].destroy({where: {
                    [Op.and]: [
                        {API_key: apiKey},
                        {user_id:userID}
            ]}})
            return {status:"success", data: results};
        }catch(error){
            return {status:"error", data: error.message || "Unable to destroy workflow_group"};
        }
    },
    getWorkflowGroupByUserId: async (userID) => {
        try{
            let results = await mySkyway.models["workflow_group"].findOne({where:{user_id:userID}})
            if(results !== null && results.user_id === userID){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to workflow_group`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to find workflow_group"};
        }
    },
    getWorkflowGroupsByUserId: async (userID) => {
        try{
            let results = await mySkyway.models["workflow_group"].findAll({where:{user_id:userID}})
            if(results !== null && results.length > 0){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to workflow_groups`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to find workflow_groups"};
        }
    },
    getWorkflowGroupByID: async (groupID) => {
        try{
            let results = await mySkyway.models["workflow_group"].findOne({where: {id:groupID}})
            if(results !== null && results.id === groupID){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to workflow_group`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to find workflow_group"};
        }
    },
    getWorkflowGroupByAPIKey: async (apiKey) => {
        try{
            let results = await mySkyway.models["workflow_group"].findOne({where: { API_key: apiKey  }})
            if(results !== null && results.API_key === apiKey){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to workflow_group`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to find workflow_group"};
        }
    },
    getWorkflowGroupByAPIKeyAndUserId: async (apiKey, userID) => {
        try{
             let results = await mySkyway.models["workflow_group"].findOne({where: {
                 [Op.and]: [
                         { API_key: apiKey },
                         { user_id: userID }
                     ]}})
            if(results !== null && results.API_key === apiKey && results.user_id === userID){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to workflow_group`};
            }
        }catch(error){
             return {status:"error", data: error.message || "Unable to find workflow_group"};
        }
    },
    getGroupsWithId: async (req, res) => {
        try
        {
            let results = await workflowGroup.findAll({where: {user_id: req.body.userId}});
            if (results !== null)
            {
                res.status(200).send(results);
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
    editGroupName: async (req, res) => {
        try{
            let results;
            if (req.body.newGroupName !== "")
                results = await workflowGroup.update({group_name:req.body.newGroupName},{where: {group_name:req.body.groupName}})
            if(results !== null && results[0] >= 1){
                res.status(200).send("Success");
            }else{
                res.status(400).send("Failed");
            }
        }catch(error){
            res.status(400).send(`${error}`);
        }
    },
    getGroupIdWithGroupName: async (req, res) => {
        try{
            let results = await workflowGroup.findOne({where: {group_name: req.body.group_name}});
            if (results !== null) {
                res.status(200).send(results);
            }
            else{
                res.send("Failed");
            }
        }catch(error){
            res.send(`${error}`);
        }
    }
}

module.exports = WorkflowGroupController;
