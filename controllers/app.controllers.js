const { fetchApi } = require("../models/app.models");

exports.getApi = (req, res) => {
    const endpoints = fetchApi();
    return res.status(200).send({ endpoints });
};
