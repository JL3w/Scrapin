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
        res.send("Scraped!");
    }); 
});

app.get("/articles", function (req, res) {
    db.Article.find({fav: false}, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
});


app.get("/clear", function (req, res) {
    console.log("Clearing Articles")
    db.Article.deleteMany({fav: false}, function (error) {
        if (error) {
            console.log(error);
            res.send(error);
        }   
    });
    db.Article.find({ fav: false })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});


app.get("/save/:id", function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { fav: true })
        .then(function (data) {
            res.json(data);
            console.log("saved")
        })
        .catch(function (err) {
            res.json(err);
        });;
});

app.get("/articles/saved", function (req, res) {
    db.Article.find({ fav: true })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/articles/saved/:id", function (req, res) {
    db.Article.deleteOne({ _id: req.params.id })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

module.exports = app;