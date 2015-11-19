define(["app"], function (app) {
    'use strict';
    app.factory("repositoryService",
                function () {
                    var storage = {};

                    function setSearchTerm(searchTerm) {
                        storage.searchTerm = searchTerm;
                    }
                    function getSearchTerm() {
                        return storage.searchTerm;
                    }

                    return {
                        setSearchTerm: setSearchTerm,
                        getSearchTerm: getSearchTerm,
                    }
                });
});