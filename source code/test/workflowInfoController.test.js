let WorkflowInfoController = require("../app/controllers/workflow_info.controller")
let mySkyway = require("../app/database/skyway")
const WorkflowController = require("../app/controllers/workflow.controller");

afterAll(async () => {
  await mySkyway.close(); //close connect after all tests are completed
});

beforeAll(async () => {
    await mySkyway.test().then(async (results) => {
        while (results.status === "error") {
            results = await mySkyway.test();
        }
        console.log("DONE");
    });
});

let id;

describe("The WorkflowInfoController should", () => {
    jest.setTimeout(15000);
    it("should addWorkflowInfo", async () => {
        //name, groupID, workflowID, userID, params
        let results = await WorkflowInfoController.addWorkflowInfo("test-workflow", 48, "6cec2c80-05d6-40e1-955e-08f150e8a999",34,"test-params")
        id = results.data.id;
        expect(results.data.workflow_name).toEqual("test-workflow")
    });
    it("should getWorkflowByUserIdWorkflowId", async () => {
        let results = await WorkflowInfoController.getWorkflowByUserIdWorkflowId(34, "6cec2c80-05d6-40e1-955e-08f150e8a999")
        expect(results.data.workflow_id).toEqual("6cec2c80-05d6-40e1-955e-08f150e8a999")
    });
    it("should getWorkflowByGroupIdWorkflowId", async () => {
        let results = await WorkflowInfoController.getWorkflowByGroupIdWorkflowId(48, "6cec2c80-05d6-40e1-955e-08f150e8a999")
        console.log("Hello", results.data);
        expect(results.data.workflow_id).toEqual("6cec2c80-05d6-40e1-955e-08f150e8a999")
    });
    it("should getAPIKeyByUserIdWorkflowId", async () => {
        let results = await WorkflowInfoController.getAPIKeyByUserIdWorkflowId(34, "6cec2c80-05d6-40e1-955e-08f150e8a999")
       console.log(results.data);
        expect(results.data).toEqual("b6c4108c-685a-497d-8b7d-7a5642499a67")
    });
    it("should getWorkflowByID", async () => {
        let results = await WorkflowInfoController.getWorkflowByID(id)
        expect(results.data.id).toEqual(id)
    });
    it("should getWorkflowsGroupByAPIKey", async () => {
        let results = await WorkflowInfoController.getWorkflowsGroupByAPIKeyUserID("b6c4108c-685a-497d-8b7d-7a5642499a67")
        expect(results.data.length > 0).toBeTruthy()
    });
    it("should updateWorkflowInfo", async () => {
        let results = await WorkflowInfoController.updateWorkflowInfo(34, "6cec2c80-05d6-40e1-955e-08f150e8a999", "more-test-params")
        expect(results.data[0] >= 1).toBeTruthy()
    });
    it("should updateWorkflowName", async () => {
        let results = await WorkflowInfoController.updateWorkflowName(34, "6cec2c80-05d6-40e1-955e-08f150e8a999", "another-test-name")
        expect(results.data[0] >= 1).toBeTruthy()
    });
    it("should deleteWorkflowInfo AND should deleteAllWorkflowInfoFromGroup", async () => {
        let results = await WorkflowInfoController.deleteWorkflowInfo("6cec2c80-05d6-40e1-955e-08f150e8a999", 34)
        expect(results.data).toEqual(1);
        const user_id = 34, group_id = 48, apiKey = "b6c4108c-685a-497d-8b7d-7a5642499a67";
        await WorkflowController.addWorkflowsToDb(user_id, apiKey, (err, content) => {
            if (err) {
                console.log(err);
                expect(err).toBe("Correct"); //force error
            }
        });
        results = await WorkflowInfoController.deleteAllWorkflowInfoFromGroup(group_id);
        expect(results.status).toEqual("success")
    });
    it("should getWorkflowInfoWithId", (done) => {
        let req =
            {
                body:{
                    userId: 157
                }
            }
        let res = {
            status: function (value) {
                expect(value).toBe(200);
                return this
            },
            send: function (value) {
                console.log(value); //if value reaches here, no error, test complete
                done();
                return this
            },
            write: function (value) {
                console.log(value);
                return this
            }
        };
        WorkflowInfoController.getWorkflowInfoWithId(req, res);
    });
    it("should editWorkflowParams", (done) => {
        let req =
            {
                body:{
                    workflow_id: "2e840464-64e7-4fff-8e1c-90f1d7777d84",
                    newParams: "tempParams",
                    userId: 157
                }
            }
        let res = {
            status: function (value) {
                expect(value).toBe(200);
                return this
            },
            send: function (value) {
                console.log(value); //if value reaches here, no error, test complete
                done();
                return this
            },
            write: function (value) {
                console.log(value);
                return this
            }
        };
        WorkflowInfoController.editWorkflowParams(req, res);
    });
    it("should editWorkflowParamsBack", (done) => {
        let req =
            {
                body:{
                    workflow_id: "2e840464-64e7-4fff-8e1c-90f1d7777d84",
                    newParams: "[{\"label\":\"\",\"name\":\"Email_Address\",\"type\":\"email\",\"value\":\"\"}]",
                    userId: 157
                }
            }
        let res = {
            status: function (value) {
                expect(value).toBe(200);
                return this
            },
            send: function (value) {
                console.log(value); //if value reaches here, no error, test complete
                done();
                return this
            },
            write: function (value) {
                console.log(value);
                return this
            }
        };
        WorkflowInfoController.editWorkflowParams(req, res);
    });
});

