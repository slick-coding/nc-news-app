const express = require("express");
const { getApi } = require("./controllers/app.controllers");
const { getTopics } = require("./controllers/topics.controllers.js");
const {
    getArticlesById,
    getArticles,
    getCommentsById,
    postComment,
    patchArticleById,
} = require("./controllers/articles.controllers.js");
const { handlePsqlErrors, handleCustomErrors } = require("./errors/errors.js");
const { deleteCommentById } = require("./controllers/comments.controllers.js");

const app = express();

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getCommentsById);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticleById);

app.delete("/api/comments/:comment_id", deleteCommentById);

// Error Endpoints

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.all("*", (req, res, next) => {
    res.status(404).send({ msg: "Path not found" });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong");
});

module.exports = app;
