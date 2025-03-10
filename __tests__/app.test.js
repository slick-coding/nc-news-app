const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */
const request = require("supertest");
const app = require("../app.js");
/* Set up your beforeEach & afterAll functions here */

describe("GET /api", () => {
    test("200: Responds with an object detailing the documentation for each endpoint", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({ body: { endpoints } }) => {
                expect(endpoints).toEqual(endpointsJson);
            });
    });
});

describe("Error Handling", () => {
    test("404: Responds with an error when given an invalid endpoint", () => {
        return request(app)
            .get("/api/fish")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Path not found");
            });
    });
});
