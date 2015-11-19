define(['app', 'models/repository', 'config/config'], function (app) {
    'use strict';
    app.controller('issuesController',
            ['$scope', 'repositoryService', '$resource', 'issuesApiUrl',
                function ($scope, repositoryService, $resource, issuesApiUrl) {

                    var searchTerm = repositoryService.getSearchTerm();
                    $scope.searchTerm = searchTerm;

                    var repository = $resource(issuesApiUrl + ':searchTerm',
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
