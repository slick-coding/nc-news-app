exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) res.status(err.status).send({ msg: err.msg });
    next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02" || err.code === "23502") {
        res.status(400).send({ msg: "Bad request" });
    } else if (err.code === "23503") {
        res.status(404).send({ msg: "Not found" });
    }
    next(err);
};
