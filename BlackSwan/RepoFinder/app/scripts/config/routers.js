define(['app', 
    'controllers/search/main', 
    'controllers/search/list', 
    'controllers/issues'],
        function (app) {
            'use strict';
            return app
                    .config(function ($routeProvider) {
                        $routeProvider
                                .when('/', {
                                    templateUrl: 'views/home.html'
                                })
                                .when('/search', {
                                    templateUrl: 'views/search/main.html',
                                    controller: 'searchController'
                                })
                                .when('/search/list', {
                                    templateUrl: 'views/search/list.html',
                                    controller: 'searchListController'
                                })
                                .when('/issues', {
                                    templateUrl: 'views/issues.html',
                                    controller: 'issuesController'
                                })
                                .otherwise({
                                    redirectTo: '/'
                                });
                    });
        });
