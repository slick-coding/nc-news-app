const express = require("express");
const {getApi} = require("./controllers/app.controllers");

const app = express();

app.get("/api", getApi)


// Error Endpoints
app.all("*", (req, res, next) => {
    res.status(404).send({ msg: "Path not found" });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong");
});

module.exports = app;
