const express = require("express");
const request = require("supertest");
const adminRoute = require("../routes/admin");
const userAuthRoute = require("../routes/user_authentication");
const app = express();
const Request = require("../models/UserRequest");
const Users = require("../models/User");
const db = require("../configurations/db");

let reqid = ""; 
let some = ""; 
let token = "";
const validUser = {
  email: "admin@gmail.com",
  password: "admin",
};

app.use(express.json());

beforeAll(async () => {
  db.connect();

  // *****if you are running the tests for multiple times, change the reg_no and email fields of the below user at each test
  await Users.deleteOne( { email: "testaccept1@gmail.com" } )
  await Requests.deleteOne( { email: "testaccept1@gmail.com" } )
  await Requests.create(
    {
      username: "acceptTestUser",
      reg_no: "SLMC01",
      email: "testaccept1@gmail.com",
      password: "abc123",
    }
 );
  // add a query to insert a new user to the request table
  reqid = await Requests.findOne({},{"_id":1});
  
});

afterAll(async () => {
  db.close();
});


app.use("/api/auth", userAuthRoute);

describe("Login to the system as admin", () => {
  console.log("Test: Login to the system as admin");
  it("should return an access token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(admindUser)
      .expect("Content-Type", /json/);
      expect(response.statusCode).toBe(200);
      token = response.body.access_token;
    
  });
});

app.use("/api/admin", adminRoute);

// Defining tests to test the user authenticatio functionalities
describe("Test admin functionalities", () => {
  // Define test to accept user requests by admin
  console.log("Test: Admin accepts user signup requests");
  describe("Admin accepts user signup requests", () => {
    it("should return 200 status code", async () => {
      const response = await request(app)
        .post(`/api/admin/accept/${reqid._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect("Content-Type", /json/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: "User registration successful!",
        })
      );
    });
  });

  // Define test to get all user requests
  describe("Get a list of user requests", () => {
    console.log("Test: Admin gets a list of user signup requests");
    it("should return a json array", async () => {
      const response = await request(app)
        .post(`/api/admin/get-requests`)
        .set('Authorization', `Bearer ${token}`)
        .expect("Content-Type", /html/);
      // expect(response.body).toEqual(
      //   // a json file ???????????????
      // );
    });
  });
});
