define(['app', 'models/repository', 'config/config'], function (app) {
    'use strict';
    app.controller('searchListController',
            ['$scope', 'repositoryService', '$resource', 'searchApiUrl',
                function ($scope, repositoryService, $resource, searchApiUrl) {
                    var searchTerm = repositoryService.getSearchTerm();
                    $scope.searchTerm = searchTerm;

                    var repository = $resource(searchApiUrl + ':searchTerm',
                            {
                                searchTerm: '@id'
                            }
                    );

                    repository.get({
                        searchTerm: searchTerm
                    }, function (resp) {
                        $scope.searchResult = resp.items;
                    }, function (err) {
                        $scope.searchResult = {}
                    });

                }]);
});
