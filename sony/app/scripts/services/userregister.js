define(["app"], function (app) {
    'use strict';
    app.factory("userRegisterService", ["$resource", function ($resource) {
            return $resource('http://217.18.25.29:10070/register/:username', {
                username: '@id'
            }, {
                save: {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            });
//            return $resource('https://api.github.com/search/repositories?q=:searchTerm', {
//                searchTerm: '@id'
//            });
        }]);
});