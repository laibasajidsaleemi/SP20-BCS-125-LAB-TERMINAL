console.log("Welcome");

const currentPage = 0;
const limit = 10;
var totalPages;

// Getting the total number of pages
$.get("https://dummyjson.com/posts", function(data) {
    totalPages = Math.ceil(data.total / limit);
});

// fetching data from the UI
function updatePage(skip) {
    $.get("https://dummyjson.com/posts?limit=" + limit + "&skip=" + skip, function(data) {
        $("#post-list").empty();
        for (const i = 0; i < data.posts.length; i++) {
            $("#post-list").append("<div class='post'>" + data.posts[i].title + "</div>");
        }
        currentPage = Math.floor(skip / limit) + 1;
        $("#page-number").text(currentPage + " of " + totalPages);
    });
}

$("#pre-page").click(function() {
    if (currentPage > 1) {
        updatePage((currentPage - 2) * limit);
    }
});
$("#next-page").click(function() {
    if (currentPage < totalPages) {
        updatePage(currentPage * limit);
    }
});

updatePage(0);
