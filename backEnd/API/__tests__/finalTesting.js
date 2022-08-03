const express = require("express");
const request = require("supertest");
const app1 = require("../index");
const userAuthRoute = require("../routes/user_authentication");
const patientRoute = require("../routes/patient");
const app = express();
const db = require("../configurations/db");
const Requests = require("../models/UserRequest");
const adminRoute = require("../routes/admin");
const Users = require("../models/User");

describe("test connection with the server", () => {
    it(`should return 200 status code with "Welcome to server!" message`, async () => {
      const response = await request(app1).get("/").expect("Content-Type", /json/);
      expect(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          msg: "Welcome to server!",
        })
      );
    });
  });
  

let usertoken = "";
let admintoken = "";
let refresh= "";
let reqid = ""; 

const adminUser = {
  email: "admin@gmail.com",
  password: "admin",
};

const newUser = {
  username: "forTest",
  reg_no: "test01",
  email: "forTest@gmail.com",
  password: "abc123",
};

const validUser = {
  email: "test1@gmail.com",
  password: "test1",
};

const invalidUser = {
  email: "invalid@gmail.com",
  password: "InvalidPassword",
};

const newPatient = {
  examiner_email: validUser.email,
  patient_name: "testPatient",
  patient_habits: "none",
  patient_district: "Puttlam",
  patient_contact_no: "0727896451",
  patient_gender: "Male",
  patient_age: "67",
  //patient_photo: req.body.patient_photo,
  description: "none",
};

beforeAll(async () => {
  db.connect();
  // add a query to delete a user with the same name as newUser, if available
  await Requests.deleteOne( { email: newUser.email } )
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

app.use(express.json());

app.use("/api/auth", userAuthRoute);

// Defining tests to test the user authenticatio functionalities
describe("Test user Authentications", () => {
  // Define test to register new user to the system
  describe("Signup to system as new User", () => {
    it("should return 200 status code", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .send(newUser)
        .expect("Content-Type", /json/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
          message:
            "The Signup Request sent successfully. Wait for the approval",
        })
      );
    });
  });

  // define test to login to the system with valid user
  describe("Login to the system with valid user", () => {
    it("should return 200 status code with success true and user details", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send(validUser)
        .expect("Content-Type", /json/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
          access_token: expect.any(String),
          refresh_token: expect.any(String),
        })
      );
      usertoken = response.body.access_token;
      refresh = response.body.refresh_token;
    });
  });

  app.use("/api/patient", patientRoute);

  // define test to add new patient with a valid user
  describe("Add a new patient", () => {
    it("should return 200 status code with a message and patient name", async () => {
      const response = await request(app)
        .post("/api/patient/add")
        .set('Authorization', `Bearer ${usertoken}`)
        .send(newPatient)
        .expect("Content-Type", /json/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
          message: "Successfully added",
          patient: newPatient.patient_name,
        })
      );
    });
  });
  // TODO: uplaod an image

  // TODO: uplaod a less quality image

  app.use("/api/auth", userAuthRoute);

  // define test to logout from the system
  describe("Log out", () => {
    it("should return 200 status code with success message", async () => {
      const response = await request(app)
        .post("/api/auth/logout")
        .set("refresh_token", refresh)
        .expect("Content-Type", /json/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: "Successfuly logged out"
        })
      );
    });
  });


  // Define test to login to the system with invalid user
  describe("Login to the system with invalid user", () => {
    it("should return 200 status code with success false and error message", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send(invalidUser)
        .expect("Content-Type", /json/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
          message: "Wrong credentials!",
        })
      );
    });
  });
});

app.use("/api/auth", userAuthRoute);

describe("Login to the system as admin", () => {
  it("should return an access token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(adminUser)
      .expect("Content-Type", /json/);
      expect(response.statusCode).toBe(200);
      admintoken = response.body.access_token;
    
  });
});

app.use("/api/admin", adminRoute);

// Defining tests to test the user authenticatio functionalities
describe("Test admin functionalities", () => {
  // Define test to accept user requests by admin
  describe("Admin accepts user signup requests", () => {
    it("should return 200 status code", async () => {
      const response = await request(app)
        .post(`/api/admin/accept/${reqid._id}`)
        .set('Authorization', `Bearer ${admintoken}`)
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
    it("should return a json array", async () => {
      const response = await request(app)
        .post(`/api/admin/get-requests`)
        .set('Authorization', `Bearer ${admintoken}`)
        .expect("Content-Type", /html/);
    });
  });
});

