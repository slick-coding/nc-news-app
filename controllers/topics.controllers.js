const { fetchTopics } = require("../models/topics.models.js");

exports.getTopics = (req, res) => {
    return fetchTopics().then((topics) => {
        return res.status(200).send({ topics });
    });
};
