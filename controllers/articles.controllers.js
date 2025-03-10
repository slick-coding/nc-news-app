const { fetchArticlesById } = require("../models/articles.models");

exports.getArticlesById = (req, res) => {
    const { article_id } = req.params;
    return fetchArticlesById(article_id).then((articles) => {
        return res.status(200).send({ articles });
    });
};
