const { fetchArticlesById, fetchArticles } = require("../models/articles.models.js");

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
