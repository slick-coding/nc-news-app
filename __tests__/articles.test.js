const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeAll(() => seed(data));

afterAll(() => db.end());

describe.skip("GET /api/articles/author_id", () => {
    test("200: Responds with a topics object with the keys slug and description", () => {
        return request(app)
            .get("/api/articles/2")
            .expect(200)
            .then(({ body: { articles } }) => {
                expect(articles.author).toBe("icellusedkars")
                expect(articles.title).toBe("Sony Vaio; or, The Laptop")
                expect(articles.article_id).toBe(2)
                expect(articles.body).toBe("Call me Mitchell. Some years ago..")
                expect(articles.topic).toBe("mitch")
                expect(articles.created_at).toBe(1602828180000)
                expect(articles.votes).toBe(0)
                expect(articles.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
            });
    });
});

describe.skip("Error Handling", () => {
    test("404: Responds with an error when given an invalid endpoint", () => {
        return request(app)
            .get("/api/articles/coding")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Path not found");
            });
    });
    test("404: Responds with an error when given an invalid article_id", () => {
        return request(app)
            .get("/api/articles/67")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Article not found");
            });
    });
    test("400: Responds with an error when SQL injection is attempted", () => {
        return request(app)
            .get("/api/articles/2; DROP TABLES")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    });
});
