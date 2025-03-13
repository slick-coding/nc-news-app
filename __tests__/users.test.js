const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeAll(() => seed(data));

afterAll(() => db.end());

describe("GET /api/users", () => {
    test("200: Responds with an array of users", () => {
        return request(app)
        .get("/api/users")
        .expect(200)
        .then(({body: {users}}) => {
            users.forEach((user) => {
                expect(user.hasOwnProperty("username")).toBe(true)
                expect(user.hasOwnProperty("name")).toBe(true)
                expect(user.hasOwnProperty("avatar_url")).toBe(true)
            })
        })
    });
});

describe("Error handling", () => {
    describe("GET /api/users", () => {
        test("404: Responds with an error when given an invalid endpoint", () => {
            return request(app)
            .get("/api/users; DROP TABLES")
            .expect(404)
            .then(({body: {msg}}) => {
                expect(msg).toBe("Path not found")
            })
        })
    })
})