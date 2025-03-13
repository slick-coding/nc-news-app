const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeAll(() => seed(data));

afterAll(() => db.end());

describe("DELETE /api/comments/:comment_id", () => {
    test("204: deletes the specified comment", () => {
        return request(app)
            .delete("/api/comments/1")
            .expect(204)
            .then(() => {
                return db.query("SELECT * FROM comments").then(({rows}) => {
                    expect(rows.length).toBe(17);
                });
            });
    });
});
