let AdminUserController = require("../app/controllers/admin_user.controller");
let mySkyway = require("../app/database/skyway");
const {createToken} = require("../app/validation/jwtValidate");
let auth = require("../app/middleware/auth")

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
const access_token = createToken("andre@phiquest.io", "?");

describe("The AdminUserController should", () => {
    it("should addUser", async () => {
        let results = await AdminUserController.addUser("temp@doe.com", "John", "Doe", "1//0dEM_C4n9eWtZCgYIARAAGA0SNwF-L9IrQYJ6bIqirwf62eYYDps5pz0JvIJ1pX2pdzroKw53d9GqTTYSKseFeIj_ENkhrew3ZvE", "{\"access_token\":\"ya29.a0ARrdaM_JY38KotRXAjOouZTFTJa4Hp351z5xBibwJ-kSAjjyQuLJ1_D143noM2U6gvBkkmtbZvJaxNh88oCws__qEaJ4CpWOZMEaldV_-wBtBMlQWK7ChEbchbtHw-9cgdB3D0T80ET4rRefaWfL2zSVKi2o\",\"refresh_token\":\"1//0dEM_C4n9eWtZCgYIARAAGA0SNwF-L9IrQYJ6bIqirwf62eYYDps5pz0JvIJ1pX2pdzroKw53d9GqTTYSKseFeIj_ENkhrew3ZvE\",\"scope\":\"openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive\",\"token_type\":\"Bearer\",\"id_token\":\"eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxODkyZWI0OWQ3ZWY5YWRmOGIyZTE0YzA1Y2EwZDAzMjcxNGEyMzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MDA2MzIzNzUzODItMTJiM2hxMWM4NDY1aWI2b2lyYWNiNmRuM3M3MHI5ZWcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MDA2MzIzNzUzODItMTJiM2hxMWM4NDY1aWI2b2lyYWNiNmRuM3M3MHI5ZWcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQwNjI3MjgwNzYyMjM1MzcwMTIiLCJoZCI6InBoaXF1ZXN0LmlvIiwiZW1haWwiOiJqYXlAcGhpcXVlc3QuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkRHcndpcFJ2V05VNU9nN1hubmRnaWciLCJuYW1lIjoiSmF5IERpbmljb2xhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSndYYkw5X1l1NmtLeWlLNFRWUlFaV3FuX2hVT0FjTHFDN3diVS1RPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkpheSIsImZhbWlseV9uYW1lIjoiRGluaWNvbGEiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYzOTE2OTU3OCwiZXhwIjoxNjM5MTczMTc4fQ.GK0mlacmmkTGr1Wr5Dm8-2BiJvt6DT95BfGNiSj9FA0b44w8rpXiz6rDzHy3nG4hsZR-12wLvRqzjpZ_kcYN101jVXR6HdoowFhIbJl0oUttuayu7jxiUYu-yPSYk56uILZ6pdoqlwRYA9aOHA7WmZhD8qBL6x9M_xM769278whT2S2OvJPttvD24VBU-0yNYXjwSs3kzeAAja3qr9T5zG0b_eLdshIQRDdSjWy4BQ3WvgMwHTswmeQuS7kxhFgzmcGFM39SUqC501uQSx-lWnxefi4iY3rNEwBNp2e02VHeZse3ThNHyWan5NP_ARJqcyJdNIDQfNVMmOvuaDXSEg\",\"expiry_date\":1639173177369}", 456)
        expect(results.status).toBe("success");
        results = results.data.toJSON(); //results.data contains a sequelize Model
        id = results.id;
        delete results.id;
        expect(results).toEqual({"email":"temp@doe.com","first_name":"John","last_name":"Doe","refresh_token":"1//0dEM_C4n9eWtZCgYIARAAGA0SNwF-L9IrQYJ6bIqirwf62eYYDps5pz0JvIJ1pX2pdzroKw53d9GqTTYSKseFeIj_ENkhrew3ZvE","token":"{\"access_token\":\"ya29.a0ARrdaM_JY38KotRXAjOouZTFTJa4Hp351z5xBibwJ-kSAjjyQuLJ1_D143noM2U6gvBkkmtbZvJaxNh88oCws__qEaJ4CpWOZMEaldV_-wBtBMlQWK7ChEbchbtHw-9cgdB3D0T80ET4rRefaWfL2zSVKi2o\",\"refresh_token\":\"1//0dEM_C4n9eWtZCgYIARAAGA0SNwF-L9IrQYJ6bIqirwf62eYYDps5pz0JvIJ1pX2pdzroKw53d9GqTTYSKseFeIj_ENkhrew3ZvE\",\"scope\":\"openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive\",\"token_type\":\"Bearer\",\"id_token\":\"eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxODkyZWI0OWQ3ZWY5YWRmOGIyZTE0YzA1Y2EwZDAzMjcxNGEyMzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MDA2MzIzNzUzODItMTJiM2hxMWM4NDY1aWI2b2lyYWNiNmRuM3M3MHI5ZWcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MDA2MzIzNzUzODItMTJiM2hxMWM4NDY1aWI2b2lyYWNiNmRuM3M3MHI5ZWcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQwNjI3MjgwNzYyMjM1MzcwMTIiLCJoZCI6InBoaXF1ZXN0LmlvIiwiZW1haWwiOiJqYXlAcGhpcXVlc3QuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkRHcndpcFJ2V05VNU9nN1hubmRnaWciLCJuYW1lIjoiSmF5IERpbmljb2xhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSndYYkw5X1l1NmtLeWlLNFRWUlFaV3FuX2hVT0FjTHFDN3diVS1RPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkpheSIsImZhbWlseV9uYW1lIjoiRGluaWNvbGEiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYzOTE2OTU3OCwiZXhwIjoxNjM5MTczMTc4fQ.GK0mlacmmkTGr1Wr5Dm8-2BiJvt6DT95BfGNiSj9FA0b44w8rpXiz6rDzHy3nG4hsZR-12wLvRqzjpZ_kcYN101jVXR6HdoowFhIbJl0oUttuayu7jxiUYu-yPSYk56uILZ6pdoqlwRYA9aOHA7WmZhD8qBL6x9M_xM769278whT2S2OvJPttvD24VBU-0yNYXjwSs3kzeAAja3qr9T5zG0b_eLdshIQRDdSjWy4BQ3WvgMwHTswmeQuS7kxhFgzmcGFM39SUqC501uQSx-lWnxefi4iY3rNEwBNp2e02VHeZse3ThNHyWan5NP_ARJqcyJdNIDQfNVMmOvuaDXSEg\",\"expiry_date\":1639173177369}", expiresIn:456})
    });
    it("should getUserByEmail", async () => {
        let results = await AdminUserController.getUserByEmail("temp@doe.com")
        console.log(results.data);
        expect(results.status).toBe("success");
    });
    it("should updateRefreshToken", async () => {
        let results = await AdminUserController.updateRefreshToken("temp@doe.com","1//0dV0GrWylSMghCgYIARAAGA0SNwF-L9IrShKGl7g7lzGCb9QiWny80QdLOfTeaJvOfW2MtS-B6QYJem6c0s9fXHGsCO2nuImg8gg")
        console.log(results.data)
        expect(results.data).toBe(1)
    });
    it("should updateToken", async () => { //add updateexpire
        let results = await AdminUserController.updateToken("temp@doe.com","{\"access_token\":\"ya29.a0ARrdaM8tlcU5Ip_UDGLL2bTXqvc2BN_DDqCf-Pwmp-X7fBQQjvAEaoJxnL-RUlIuOKg3k-2qTXo0P7qiAMf4Z5Y-yzC0NyiiGMKzPMcss0fq8B4D7IarYrzHuxEKIongpHLeimrp1Pp2a-LJwij5ptLyHBMUCQ\",\"scope\":\"https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile\",\"token_type\":\"Bearer\",\"id_token\":\"eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5OGY0OWJjNmNhNDU4MWVhZThkZmFkZDQ5NGZjZTEwZWEyM2FhYjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3ODMzNDA2Mzg0OTAtZDQyNjBkam5nNG5xZnZtMmczdnU2cHEzMjRtYWNyMnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3ODMzNDA2Mzg0OTAtZDQyNjBkam5nNG5xZnZtMmczdnU2cHEzMjRtYWNyMnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk0ODcyNTkzOTgyNTIyNDA5NDgiLCJoZCI6InBoaXF1ZXN0LmlvIiwiZW1haWwiOiJhbmRyZUBwaGlxdWVzdC5pbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiOHR4NG9nRGVyZ0xHX2psQjRnZXpkUSIsIm5hbWUiOiJBbmRyZSBSb2JlcnRzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqM19mMUZHVWhORWNLVWlEX0poQjlCRDF6bHVmY2FRWHJadU5Fcz1zOTYtYyIsImdpdmVuX25hbWUiOiJBbmRyZSIsImZhbWlseV9uYW1lIjoiUm9iZXJ0cyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjM5NzcxNzI1LCJleHAiOjE2Mzk3NzUzMjV9.hJeE8P_2b8yavlWmWZ1G969I6uOBgToYBrxY9xiqKeeYCrz9-DbvgHA-m72OTUoP3jgE6MOlfyv6r1NTQyiXCFK6kFCw-6mq8HjVeUfZG0q4Kh2ybCpx5K069vfiaDIO9or4lgGeWemzZ6r4wV7Np-yPlvcB1OcRMUszkMKo-QuEZhwr8pEeiJ1MSNbMG2r9c43ho1mDABezIESkDCPPMWpjMIQubRK6L_xkUycIjymPgk3tSNtT7JJ3zhXE_w7Pv0jav2V5Pia_2aHMuRufD1Bv-09XUvFc9wlrrK1ooq1t_1DWCaB-owxkcuo8J8-kFTxSDdwf41q7OsXXs3UX8w\",\"expiry_date\":1639775324153}")
        console.log(results.data)
        expect(results.data).toBe(1)
    });
    it("should updateExpire", async () => { //add updateexpire
        let results = await AdminUserController.updateExpire("temp@doe.com",123);
        console.log(results.data)
        expect(results.data).toBe(1)
    });
    it("should deleteUser", async () => {
        let results = await AdminUserController.deleteUser("temp@doe.com")
        expect(results.data).toBe(1)
    });
    it("should getAllAdminAccounts", (done) => {
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
        AdminUserController.getAllAdminAccounts(req, res);
    });
    it("should addUserFromDashboard", (done) => {
        let req =
            {
                body:{
                    email: "temp@email.com",
                    firstname: "tempFirst",
                    lastname: "tempLast",
                    password: "tempPassword"
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
        AdminUserController.addUserFromDashboard(req, res);
    });
    jest.setTimeout(15000);
    it("should editUserFromDashboard", (done) => {
        let req =
            {
                body:{
                    email: "temp@email.com",
                    newFirstname: "tempFirst2",
                    newLastname: "",
                    newEmail: ""
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
        AdminUserController.editUserFromDashboard(req, res);
    });
    it("should deleteUserFromDashboard", (done) => {
        let req =
            {
                body:{
                    deleteEmail: "temp@email.com",
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
        AdminUserController.deleteUserFromDashboard(req, res);
    });
});
