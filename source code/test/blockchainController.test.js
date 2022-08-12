let blockchainController = require("../app/controllers/blockchain.controller");
let mySkyway = require("../app/database/skyway");
let transactionController = require("../app/controllers/transaction.controller");
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

describe("The blockchainController should", () => {
    it("should getGroupAPIKey", async () => {
        let results = await blockchainController.getGroupAPIKey("dee20fe5-1840-4dc5-934e-8d2e01b6463a")
        console.log(results.data);
        expect(results.status).toBe("success");
    });
    /* cant be tested since Phiblock is not declared here
    it("passStream", async (done) => {
        let req =
            {
                body: {
                    "instanceId": "5dcfb823-95a1-11ec-9f4a-0242ac120002",
                    "timestamp": "2022-02-24T18:41:35+00:00",
                    "wfVariables": {
                        "myFile": {
                            "documentId": "60b44487-4b4d-4b3d-af38-e0fa0d32aae7"
                        },
                        "Send_to": "allenc4537@hotmail.com",
                        "accusoft_solutions_workflowInitiator": "allenc4537@hotmail.com",
                        "accusoft_solutions_workflowInitiatorName": "Allen Cheng"
                    }
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
        blockchainController.passStream(req, res);
    });*/
    /*
    it("should deleteTransaction", async () => {
        let results = await transactionController.deleteTransaction("60b44487-4b4d-4b3d-af38-e0fa0d32aae7")
        expect(results.data).toBe(1)
    });*/
});