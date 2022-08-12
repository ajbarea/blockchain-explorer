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

describe("The transactionController should", () => {
    it("should addTransactionToDB", async () => {
        let results = await transactionController.addTransactionToDB("2022-02-24T18:41:35+00:00", "90b44487-4b4d-4b3d-af38-e0fa0d32aae7", "a6a1b0d4ef5a3bad46aafc227d66f7d765b8db8d3b9c8b678cdd5bff012f2ba0", "{\"myFile\":{\"documentId\":\"60b44487-4b4d-4b3d-af38-e0fa0d32aae7\"},\"Send_to\":\"allenc4537@hotmail.com\",\"accusoft_solutions_workflowInitiator\":\"allenc4537@hotmail.com\",\"accusoft_solutions_workflowInitiatorName\":\"Allen Cheng\"}", "bbe4682097f611ec9c70553a5a44ce94", 1);
        expect(results.status).toBe("success");
        results = results.data.toJSON(); //results.data contains a sequelize Model
        id = results.id;
        delete results.id;
        expect(results).toEqual({"time":"2022-02-24T18:41:35+00:00","documentID":"90b44487-4b4d-4b3d-af38-e0fa0d32aae7","hash":"a6a1b0d4ef5a3bad46aafc227d66f7d765b8db8d3b9c8b678cdd5bff012f2ba0","wfVariables":"{\"myFile\":{\"documentId\":\"60b44487-4b4d-4b3d-af38-e0fa0d32aae7\"},\"Send_to\":\"allenc4537@hotmail.com\",\"accusoft_solutions_workflowInitiator\":\"allenc4537@hotmail.com\",\"accusoft_solutions_workflowInitiatorName\":\"Allen Cheng\"}", "transactionID":"bbe4682097f611ec9c70553a5a44ce94", "index": 1});
    });
    it("should getTransactionByHash", (done) => {
        let req =
            {
                body:
                    {
                        hash: "9b0b739ce9d4947543390710edf7bc733ecf41f1ca23762e724f20bbdddd7f81"
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
        transactionController.getTransactionByHash(req, res);
    });
    it("should searchTransaction", (done) => {
        let req =
            {
                body:
                    {
                        documentID: "ae19d941-958c-4f4a-98bd-fa82729a0364",
                        hash: ""
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
        transactionController.searchTransaction(req, res);
    });
    it("should getLatestTransactions", (done) => {
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
        transactionController.getLatestTransactions(req, res);
    });
    //other variants are the same, so will not be included
    it("should getThisMonthTransactions", (done) => {
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
        transactionController.getThisMonthTransactions(req, res);
    });
    it("should deleteTransaction", async () => {
        let results = await transactionController.deleteTransaction("90b44487-4b4d-4b3d-af38-e0fa0d32aae7")
        expect(results.data).toBe(1)
    });
});