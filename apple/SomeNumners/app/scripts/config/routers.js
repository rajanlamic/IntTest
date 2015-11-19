define(['app', 
    'controllers/home'],
        function (app) {
            'use strict';
            return app
                    .config(function ($routeProvider) {
                        $routeProvider
                                .when('/', {
                                    templateUrl: 'views/home.html',
                                    controller: 'homeController'
                                })
                                .otherwise({
                                    redirectTo: '/'
                                });
                    });
        });
