let groupAccessTokenController = require("../app/controllers/group_acccess_token.controller");
let mySkyway = require("../app/database/skyway");

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

describe("The groupAccessTokenController should", () => {
    it("should addToken", async () => {
        let results = await groupAccessTokenController.addToken("temp documentID", "temp group access token");
        expect(results.status).toBe("success");
    });
    it("should getTokenWithDocumentId", async () => {
        let results = await groupAccessTokenController.getTokenByDocumentId("temp documentID");
        expect(results.status).toBe("success");
    });
    it("should deleteToken", async () => {
        let results = await groupAccessTokenController.deleteToken("temp documentID");
        expect(results.data).toBe(1);
    });
});