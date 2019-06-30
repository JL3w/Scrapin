init();
renderSavedArticles();

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
                "<a href='" + data[i].url + "' class='card-text'>" + data[i].title + "</a>" +
                "<button class='btn btn-secondary float-right' id='fav-art' data-id=" + data[i]._id + ">Fav Article</button>" +
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

$(document).on("click", "#fav-art", function (data) {
    event.preventDefault();
    let Id = $(this).data().id;
    console.log(Id)
    $.ajax({
        method: "GET",
        url: "/save/" + Id,
    }).then(function () {
        init();
    });
});

function renderSavedArticles() {
    $.getJSON("/articles/saved", function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#fav").append(
                "<div class='card bg-light w-85'>" +
                "<div class='card-body'>" +
                "<a href='" + data[i].url + "' class='card-text'>" + data[i].title + "</a>" +
                "<button class='btn btn-success float-right' id='addnote' data-toggle='modal' data-target='#addmodal' data-id=" + data[i]._id + ">Notes</button>" +
                "<button class='btn btn-danger float-right' style='margin-right: 10px' id='deletearticle' data-id=" + data[i]._id + ">Remove</button></li>" +
                "</div>" +
                "</div>" +
                "<br>"
            )
        }
    });
};
