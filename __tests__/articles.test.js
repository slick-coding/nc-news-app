const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeAll(() => seed(data));

afterAll(() => db.end());

describe("GET /api/articles/author_id", () => {
    test("200: Responds with the article object matching the given id", () => {
        return request(app)
            .get("/api/articles/2")
            .expect(200)
            .then(({ body: { articles } }) => {
                expect(articles.author).toBe("icellusedkars");
                expect(articles.title).toBe("Sony Vaio; or, The Laptop");
                expect(articles.article_id).toBe(2);
                expect(articles.body).toBe("Call me Mitchell. Some years ago..");
                expect(articles.topic).toBe("mitch");
                expect(articles.created_at).toBe("2020-10-16T05:03:00.000Z");
                expect(articles.votes).toBe(0);
                expect(articles.article_img_url).toBe(
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
                );
            });
    });
});

describe.skip("GET /api/articles/author_id/comments", () => {
    test("200: Responds with an array of comments for the article matching the given id", () => {
        return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body: { comments } }) => {
                comments.forEach((comment) => {
                    expect(typeof comment.comment_id).toBe("number");
                    expect(typeof comment.votes).toBe("number");
                    expect(typeof comment.created_at).toBe("string");
                    expect(typeof comment.author).toBe("string");
                    expect(typeof comment.body).toBe("string");
                    expect(typeof comment.article_id).toBe("number");
                    expect(comment.hasOwnProperty("article_id")).toBe(false);
                });
            });
    });
    test("200: Responds with an array of comments sorted by created_at in descending order", () => {
        return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body: { comments } }) => {
                expect(comments).toBeSorted({
                    key: "created_at",
                    descending: true,
                });
                expect(comments.length).toBe(11);
            });
    });
});

describe("GET /api/articles", () => {
    test("200: Responds with an array of article objects", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
                expect(articles.length).toBe(13);
                articles.forEach((article) => {
                    expect(typeof article.author).toBe("string");
                    expect(typeof article.title).toBe("string");
                    expect(typeof article.article_id).toBe("number");
                    expect(typeof article.topic).toBe("string");
                    expect(typeof article.created_at).toBe("string");
                    expect(typeof article.votes).toBe("number");
                    expect(typeof article.article_img_url).toBe("string");
                    expect(article.hasOwnProperty("body")).toBe(false);
                });
            });
    });
    test("200: Responds with an array of objects sorted by created_at in descending order", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
                expect(articles).toBeSorted({
                    key: "created_at",
                    descending: true,
                });
                expect(articles.length).toBe(13);
            });
    });
    test("200: Responds with an array of article objects with the comment_count property", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
                console.log(articles);
                expect(articles.length).toBe(13);
                articles.forEach((article) => {
                    expect(article.hasOwnProperty("comment_count")).toBe(true);
                });
            });
    });
});

describe("Error Handling", () => {
    test("404: Responds with an error when given an invalid endpoint", () => {
        return request(app)
            .get("/api/articles/coding")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    });
    test("404: Responds with an error when given an invalid article_id", () => {
        return request(app)
            .get("/api/articles/67")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Not found");
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
