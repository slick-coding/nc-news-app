const app = require("./app");

app.listen(9090, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to port 9090");
    }
});

module.exports = app;
