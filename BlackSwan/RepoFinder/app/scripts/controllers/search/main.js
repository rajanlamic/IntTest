define(['app', 'models/repository'], function (app) {
    'use strict';
    app.controller('searchController',
            ['$scope', 'repositoryService',
                function ($scope, repositoryService) {
                    // set search term for repositoryService to search
                    $scope.setSearchTerm = function () {
                        alert($scope.searchTerm);
                        repositoryService.setSearchTerm($scope.searchTerm);
                    }
                }]);
});
