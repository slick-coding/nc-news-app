const { fetchArticlesById, fetchArticles, fetchCommentsById } = require("../models/articles.models.js");

exports.getArticlesById = (req, res, next) => {
    console.log(getArticlesById)
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
    console.log(getArticles)
    console.log(req.query)
    return fetchArticles().then((articles) => {
        return res.status(200).send({ articles });
    });
};

exports.getCommentsById = (req, res, next) => {
    const { article_id } = req.params;
    console.log(article_id)
    return fetchCommentsById(article_id)
    .then((comments) => {
        return res.status(200).send({ comments });
    })
    .catch((err) => {
        next(err);
    });
}