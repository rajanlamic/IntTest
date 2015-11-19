define(['app'], function (app) {
    app.constant(
        "searchApiUrl", "https://api.github.com/search/repositories?q="
        )
    .constant(
        "issuesApiUrl", "https://api.github.com/search/issues?q="
        )


});