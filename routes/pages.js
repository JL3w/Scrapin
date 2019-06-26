const express = require("express");
const app = express();


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/saved", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/saved.html"));
});

module.exports = app;

