const express = require("express");
const { getApi } = require("./controllers/app.controllers");
const { getTopics } = require("./controllers/topics.controllers.js");

const app = express();

app.get("/api", getApi);

app.get("/api/topics", getTopics);

// Error Endpoints
app.all("*", (req, res, next) => {
    res.status(404).send({ msg: "Path not found" });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong");
});

module.exports = app;
