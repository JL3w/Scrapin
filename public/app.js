init();

$(document).on("click", "#scrape", function () {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).then(function (data) {
        init();
    })
});

function renderArticles() {
    $.getJSON("/articles", function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#articles").prepend(
                "<div class='card bg-light w-85'>" +
                "<div class='card-body'>" +
                "<span class='card-text'>" + data[i].title + 
                "<a href='" + data[i].url + "' class='btn btn-secondary float-right'>" + "View Article" + "</a>" + "</span>" + 
                "</div>" +
                "</div>" +
                "<br>"
            )
        }
    });
};

function init() {
    $.get("/articles/").then(function (data) {
        if (data && data.length) {
            renderArticles();
        } 
    });
};

$(document).on("click", "#clear", function () {
    $.ajax({
        method: "GET",
        url: "/clear"
    }).then(function () {
        $("#articles").empty();
        init();
    });
});
