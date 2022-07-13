const express = require("express");
const request = require("supertest");
const adminRoute = require("../routes/admin");
const userAuthRoute = require("../routes/user_authentication");
const app = express();
const Request = require("../models/UserRequest");
const db = require("../configurations/db");

let reqid = ""; 
let token = "";
const validUser = {
  email: "admin1@gmail.com",
  password: "admin1",
};

app.use(express.json());

beforeAll(async () => {
  db.connect();
  reqid = await Request.findOne({},{"_id":1});
  
});

afterAll(async () => {
  db.close();
});


app.use("/api/auth", userAuthRoute);

describe("Login to the system as admin", () => {
  it("should return an access token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(validUser)
      .expect("Content-Type", /json/);
      expect(response.statusCode).toBe(200);
      token = response.body.access_token;
    
  });
});

app.use("/api/admin", adminRoute);

// Defining tests to test the user authenticatio functionalities
describe("Test admin functionalities", () => {
  // Define test to register new user to the system
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
});
