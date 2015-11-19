define(["app"], function (app) {
    'use strict';
    app.factory("someNumbersService",
                function () {
                    var storage = {
                        numbers: [1, 2, 3, 4, 5, 6, 7, 8],
                    }

                    function getNumbers() {
                        return storage.numbers;
                    }

                    return {
                        getNumbers: getNumbers
                    }
                });
});