const request = require("supertest");
const app = require("../index");

describe("test connection with the server", () => {
  it(`should return 200 status code with "Welcome to server!" message`, async () => {
    const response = await request(app).get("/").expect("Content-Type", /json/);
    expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        msg: "Welcome to server!",
      })
    );
  });
});
