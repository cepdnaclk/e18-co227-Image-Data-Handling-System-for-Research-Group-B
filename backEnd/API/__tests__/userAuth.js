const express = require("express");
const request = require("supertest");
const userAuthRoute = require("../routes/user_authentication");
const app = express();
const db = require("../configurations/db");

const newUser = {
  username: "Nethsara",
  reg_no: "E400",
  email: "neth@gmail0.com",
  password: "abc123",
};

const validUser = {
  email: "test@gmail.com",
  password: "12345",
};

const invalidUser = {
  email: "invalid@gmail.com",
  password: "InvalidPassword",
};

beforeAll(async () => {
  db.connect();
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
      // expect(response.body).toEqual(
      //   expect.objectContaining({
      //     success: true,
      //     message:
      //       "The Signup Request sent successfully. Wait for the approval",
      //   })
      // );
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
