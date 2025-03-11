const { fetchArticlesById, fetchArticles, fetchCommentsById, insertComment } = require("../models/articles.models.js");

exports.getArticlesById = (req, res, next) => {
    const { article_id } = req.params;
    return fetchArticlesById(article_id)
        .then((articles) => {
            return res.status(200).send({ articles });
        })
        .catch((err) => {
            next(err);
        });
};

exports.getArticles = (req, res) => {
    return fetchArticles().then((articles) => {
        return res.status(200).send({ articles });
    });
};

exports.getCommentsById = (req, res, next) => {
    const { article_id } = req.params;
    return fetchCommentsById(article_id)
        .then((comments) => {
            return res.status(200).send({ comments });
        })
        .catch((err) => {
            next(err);
        });
};

exports.postComment = (req, res, next) => {
    const { article_id } = req.params;
    const { author, body } = req.body;
    return insertComment(article_id, author, body)
        .then((comment) => {
            return res.status(201).send({ comment });
        })
        .catch((err) => {
            next(err);
        });
};
