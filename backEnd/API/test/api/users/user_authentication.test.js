const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../routes/user_authentication.js");
const conn = require("../../../configurations/db.js");

describe("user authentication", () => {
  before((done) => {
    conn
      .connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("OK, creating a new user", async () => {
    request(app)
      .post("/signup")
      .send({
        username: "Nethsara",
        reg_no: "E400",
        email: "neth@gmail.com",
        password: "abc123",
      })
      .then((res) => {
        const body = res.body;
        expect(body).to.cotain.property("success");
        expect(body).to.cotain.property("message");
      })
      .catch((err) => console.log(err));
  });

  it("OK, login a user", async () => {
    request(app)
      .post("/login")
      .send({ email: "neth@gmail.com", password: "abc123" })
      .then((res) => {
        const body = res.body;
        expect(body).to.cotain.property("success");
        expect(body).to.cotain.property("user");
        expect(body).to.cotain.property("access_token");
        expect(body).to.cotain.property("refresh_token");
      })
      .catch((err) => console.log(err));
  });
  it("OK, login a not existing user", async () => {
    request(app)
      .post("/login")
      .send({ email: "neth@gmail.com", password: "abc123" })
      .then((res) => {
        const body = res.body;
        expect(body.success).toBe(false);
        expect(body).to.cotain.property("user");
        expect(body).to.cotain.property("access_token");
        expect(body).to.cotain.property("refresh_token");
      })
      .catch((err) => console.log(err));
  });

  it("OK, login an existing user", async () => {
    request(app)
      .post("/login")
      .send({ email: "kamal@gmail.com", password: "kamal" })
      .then((res) => {
        const body = res.body;
        expect(body.success).toBe(true);
        expect(body).to.cotain.property("user");
        expect(body).to.cotain.property("access_token");
        expect(body).to.cotain.property("refresh_token");
      })
      .catch((err) => console.log(err));
  });
});
