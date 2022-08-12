let mySkyway = require("../database/skyway");
const groupAccessToken = mySkyway.models["group_access_token"];

const groupAccessTokenController = {
    addToken: async (documentId, APIKey) => {
        try{
            let results = await groupAccessToken.create({documentId: documentId, groupAccessToken: APIKey})
            if(results !== null && results.documentId === documentId){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed add group access token ${APIKey}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to add group access token"};
        }
    },
    getTokenByDocumentId: async (documentId) => {
        try{
            let results = await groupAccessToken.findOne({where: {documentId:documentId}})
            if(results){
                return {status:"success", data: results};
            }else{
                return {status:"failed", data: `Failed to find document with Id: ${documentId}`};
            }
        }catch(error){
            return {status:"error", data: error.message || "Unable to find documentId"};
        }
    },
    deleteToken: async (documentId) => {
        try{
            let results = await groupAccessToken.destroy({where: {documentId:documentId}})
            return {status:"success", data: results};
        }catch(error){
            return {status:"error", data: error.message || "Unable to destroy token"};
        }
    }
}
module.exports = groupAccessTokenController;