let docbridgeLogController = require("../app/controllers/docbridge_log.controller");
const mySkyway = require("../app/database/skyway");
const AdminUserController = require("../app/controllers/admin_user.controller");

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

describe("The docbridgeLogController should", () => {
    it("addLog", (done) => {
        let req =
            {
                body: {
                    "log_time": "temp",
                    "username": "temp",
                    "transaction_type": 1,
                    "transaction_typename": "temp name",
                    "transaction_description": "temp description",
                    "groupname": "temp group name",
                    "grouptoken": "temp group token"
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
        docbridgeLogController.addLog(req, res);
    });
    it("should getLastestLogs", (done) => {
        let req =
            {
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
        docbridgeLogController.getLatestLogs(req, res);
    });
    it("should searchLog", (done) => {
        let req =
            {
                body:
                    {
                        search: 157
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
        docbridgeLogController.searchLog(req, res);
    });
    //other variants should be exactly the same just change in timestamps, so will not be included
    it("should getThisMonthDocSent", (done) => {
        let req =
            {
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
        docbridgeLogController.getThisMonthDocsSent(req, res);
    });
    it("should deleteLog", async () => {
        let results = await docbridgeLogController.deleteLog("temp")
        expect(results.data).toBe(1)
    });
});