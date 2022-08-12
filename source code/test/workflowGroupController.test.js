let WorkflowGroupController = require("../app/controllers/workflow_group.controller")
let mySkyway = require("../app/database/skyway")

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

describe("The WorkflowGroupController should", () => {
    it("should addWorkflowGroup", async () => {
        let results = await WorkflowGroupController.addWorkflowGroup("45cb2789-85de-4663-a319-1122e0973999", "test-group-name", 92)
        console.log(results.data);
        expect(results.status).toEqual("success");
        results = results.data.toJSON(); //results.data contains a sequelize Model
        expect(results.group_name).toEqual("test-group-name")
    });
    it("should getWorkflowGroupByID", async () => {
        let results = await WorkflowGroupController.getWorkflowGroupByID(92)
        expect(results.data.id).toEqual(92)
    });
    it("should getWorkflowGroupByUserId", async () => {
        let results = await WorkflowGroupController.getWorkflowGroupByUserId(34)
        expect(results.data.user_id).toEqual(34)
    });
    it("should getWorkflowGroupsByUserId", async () => {
        let results = await WorkflowGroupController.getWorkflowGroupsByUserId(34)
        expect(results.data.length > 0).toBeTruthy()
    });
    it("should getWorkflowGroupByAPIKey", async () => {
        let results = await WorkflowGroupController.getWorkflowGroupByAPIKey("b6c4108c-685a-497d-8b7d-7a5642499a67")
        expect(results.data.API_key).toEqual("b6c4108c-685a-497d-8b7d-7a5642499a67")
    });
    it("should getWorkflowGroupByAPIKeyAndUserId", async () => {
        let results = await WorkflowGroupController.getWorkflowGroupByAPIKeyAndUserId("b6c4108c-685a-497d-8b7d-7a5642499a67",34)
        expect(results.data.user_id).toEqual(34)
    });
    it("should deleteWorkflowGroup", async () => {
        let results = await WorkflowGroupController.deleteWorkflowGroup("45cb2789-85de-4663-a319-1122e0973999", 92)
        expect(results.data).toEqual(1)
    });
    it("should getGroupsWithId", (done) => {
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
        WorkflowGroupController.getGroupsWithId(req, res);
    });
    jest.setTimeout(15000);
    it("should editGroupName", (done) => {
        let req =
            {
                body:{
                    groupName: "test group",
                    newGroupName: "test2 group"
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
        WorkflowGroupController.editGroupName(req, res);
    });
    it("should getGroupIdWithGroupName", (done) => {
        let req =
            {
                body:{
                    group_name: "USF Spring 2022"
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
        WorkflowGroupController.getGroupIdWithGroupName(req, res);
    });
    jest.setTimeout(15000);
    it("should editGroupNameBack", (done) => {
        let req =
            {
                body:{
                    groupName: "test2 group",
                    newGroupName: "test group"
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
        WorkflowGroupController.editGroupName(req, res);
    });
});

