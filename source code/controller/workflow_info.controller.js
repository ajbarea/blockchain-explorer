let mySkyway = require("../database/skyway")
let WorkflowGroupController = require("./workflow_group.controller")
const {Op} = require("sequelize");
const workflowInfo = mySkyway.models["workflow_info"];



const WorkflowInfoController = {
    addWorkflowInfo: async (name, groupID, workflowID, userID, params) => {
        try{
            let results = await mySkyway.models["workflow_info"].create({workflow_name: name,group_id: groupID , workflow_id:workflowID,user_id:userID,params:params})
            if(results !== null && results.workflow_id === workflowID){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to create workflow_info`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to create workflow_info"};
        }
    },
    getWorkflowByUserIdWorkflowId: async (userID, workflowID) => {
        try{
            let results = await mySkyway.models["workflow_info"].findOne({where: {
                    [Op.and]:[ {workflow_id: workflowID},
                        {user_id: userID}
                    ]}})
            if(results !== null && results.workflow_id === workflowID){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to get workflow ${workflowID}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to get workflows"};
        }
    },
    getWorkflowByGroupIdWorkflowId: async (groupID, workflowID) => {
        try{
            let results = await mySkyway.models["workflow_info"].findOne({where: {
                    [Op.and]:[ {workflow_id: workflowID},
                        {group_id: groupID}
                    ]}})
            if(results !== null && results.workflow_id === workflowID){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to get workflow ${workflowID}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to get workflows"};
        }
    },
//SELECT workflow_group.API_key, user.token FROM workflow_group, user
// WHERE workflow_group.user_id = user.id AND workflow_group.user_id =
// (SELECT user_id FROM workflow_info WHERE id = ?)

    getAPIKeyByUserIdWorkflowId: async (userID, workflowID)=>{
        try{
            let info_results = await WorkflowInfoController.getWorkflowByUserIdWorkflowId(userID,workflowID);
            //console.log(info_results);
            if(info_results !== null && info_results.data.workflow_id === workflowID){
                //call workflowGroup with the group_id to get the APIKey
                let results = await WorkflowGroupController.getWorkflowGroupByID(info_results.data.group_id)
                if(results !== null && results.data.id === info_results.data.group_id){
                    //return the API Key
                    return {status:"success", data: results.data.API_key};
                }else{
                    return {status:"failed", data: `Failed to get APIKey`};
                }
            }else{
                return {status:"failed", data: `Failed to get workflow ${workflowID}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to get workflow"};
        }
    },
    deleteWorkflowInfo: async (workflowID, userID) => {
        try{
            let results = await mySkyway.models["workflow_info"].destroy({where: {
                    [Op.and]: [
                        {workflow_id: workflowID},
                        {user_id:userID}
                    ]}})
            return {status:"success", data: results};
        }catch(error){
            return {status:"error", data: error.message || "Unable to destroy workflow_info"};
        }
    },
    deleteAllWorkflowInfoFromGroup: async (groupID) => {
        try{
            let results = await mySkyway.models["workflow_info"].destroy({where: {group_id: groupID}});
            return {status:"success", data: results};
        }catch(error){
            return {status:"error", data: error.message || "Unable to destroy workflow_info"};
        }
    },
    getWorkflowByID: async (ID) => {
        try{
            let results = await mySkyway.models["workflow_info"].findOne({where: {id:ID}})
            if(results !== null && results.id === ID){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to get workflow ${ID}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to get workflows"};
        }
    },
    getWorkflowsByGroupID: async (groupID) => {
        try{
            let results = await mySkyway.models["workflow_info"].findAll({where: {group_id:groupID}})
            if(results !== null && results.length > 0){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to get workflows`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to get workflows"};
        }
    },
    getWorkflowsGroupByAPIKeyUserID: async (apiKey, userID) => {
        try{
            let info_results = await WorkflowGroupController.getWorkflowGroupByAPIKeyAndUserId(apiKey, userID);
            if(info_results !== null && info_results.status === "success"){
                let results = await WorkflowInfoController.getWorkflowsByGroupID(info_results.data.id)
                if(results.data.length > 0){
                    return {status:"success", data: results.data};
                }else{
                    return {status:"failed", data: `Failed to get group`};
                }
            }else{
                return {status:"failed", data: `Failed to get workflow`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to get workflow"};
        }
    },
    updateWorkflowInfo: async (userID, workflowID, params) => {
        try{
            let results = await mySkyway.models["workflow_info"].update({params:params},{where:{user_id:userID,workflow_id:workflowID}})
            if(results !== null && results[0] >= 1){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to update workflow_info`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to update workflow_info"};
        }
    },
    updateWorkflowName: async (userID, workflowID, name) => {
        try{
            let results = await mySkyway.models["workflow_info"].update({workflow_name:name},{where:{user_id:userID,workflow_id:workflowID}})
            if(results !== null && results[0] === 1){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to update workflow_info`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to update workflow_info"};
        }
    },
    getWorkflowInfoWithId: async (req, res) => {
        try
        {
            let results = await workflowInfo.findAll({where: {user_id: req.body.userId}});
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
    editWorkflowParams: async (req, res) => {
        try{
            let results;
            console.log(req.body.workflow_id);
            console.log(req.body.newParams);
            if (req.body.newParams !== "")
                results = await workflowInfo.update({params:req.body.newParams},{where: {workflow_id:req.body.workflow_id, user_id:req.body.userId}})
            if(results !== null && results[0] >= 1){
                res.status(200).send("Success");
            }else{
                res.status(400).send("Failed");
            }
        }catch(error){
            res.status(400).send(`${error}`);
        }
    }
}

module.exports = WorkflowInfoController;
