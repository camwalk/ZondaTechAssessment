const request = require("supertest");
const app = require("./app.js");

describe("GET /subdivision", () => {
  it("Returns an array of subdivisions", async () => {
    const response = await request(app).get("/subdivision?page=1");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(25);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("code");
    expect(response.body[0]).toHaveProperty("name");
  });
  
  // Addtional potential future tests:
  // Check pagination
  // Check filters
  // Check each sorting option
});
