const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeAll(() => seed(data));

afterAll(() => db.end());

describe("GET api/users", () => {
    test("Responds with an array of users", () => {
        return request(app)
        .get("/api/users")
        .expect(200)
        .then(({body: {comments}}) => {
            comments.forEach((comment) => {
                expect(comment.hasOwnProperty("username")).toBe(true)
                expect(comment.hasOwnProperty("name")).toBe(true)
                expect(comment.hasOwnProperty("avatar_url")).toBe(true)
            })
        })
    });
});
