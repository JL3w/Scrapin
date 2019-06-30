const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const PORT = process.env.PORT || 3000;
const app = express();


app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI);

const api = require("./routes/api");
app.use(api);
const pages = require("./routes/pages");
app.use(pages);

app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});