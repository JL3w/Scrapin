const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const app = express();


app.get("/scrape", function (req, res) {
    axios.get("https://slashdot.org/").then(function (response) {
        var $ = cheerio.load(response.data);
        $("h2.story").each(function (i, element) {
            var result = {}
            result.title = $(element).children().find("a").text();
            result.url = $(element).children().find("a").attr("href").substring(2);
            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        res.send("Scrape Complete");
    });
});

app.get("/articles", function (req, res) {
    db.Article.find({}, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            // Otherwise, send the result of this query to the browser
            res.json(data).pretty();
        }
    });
});
module.exports = app;