require.config({
    paths: {
        "angular": "../../bower_components/angular/angular",
        "angular-route": "../../bower_components/angular-route/angular-route",
        "angular-resource": "../../bower_components/angular-resource/angular-resource",
        "angular-touch": "../../bower_components/angular-touch/angular-touch",
    },
    shim: {
        'angular': {'exports': 'angular'},
        'angular-route': ['angular'],
        'angular-resource': ['angular'],
        'angular-touch': ['angular'],
    },
    priority: [
        'angular'
    ]
});

window.name = 'NG_DEFER_BOOTSTRAP!';

require([
    'angular',
    'angular-route',
    'angular-resource',
    'angular-touch',
    'app',
    'config/routers',
], function (angular, ngRoutes, ngResource, ngTouch, app) {
    'use strict';
    angular.element().ready(function () {
        angular.resumeBootstrap([app.name]);
    });
});