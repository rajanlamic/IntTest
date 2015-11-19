define(['app',
    'controllers/register',
    'controllers/signin',
    'controllers/userdetails',
    'controllers/usertitles'],
        function (app) {
            'use strict';
            return app
                    .config(function ($routeProvider) {
                        $routeProvider
                                .when('/', {
                                    templateUrl: 'views/home.html'
                                })
                                .when('/register', {
                                    templateUrl: 'views/register.html',
                                    controller: 'registerController'
                                })
                                .when('/signin', {
                                    templateUrl: 'views/signin.html',
                                    controller: 'signinController'
                                })
                                .when('/userdetails', {
                                    templateUrl: 'views/userdetails.html',
                                    controller: 'userDetailsController'
                                })
                                .when('/usertitles', {
                                    templateUrl: 'views/usertitles.html',
                                    controller: 'userTitlesController'
                                })
                                .when('/error', {
                                    templateUrl: 'views/error.html',
                                })
                                .otherwise({
                                    redirectTo: '/'
                                });
                    });
        });
