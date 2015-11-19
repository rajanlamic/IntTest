define(['app', 'models/user'], function (app, userModel) {
    'use strict';
    app.controller('userTitlesController',
            ['$scope', 'userModel', '$location', '$resource',
                function ($scope, userModel, $location, $resource) {
                    $scope.what = 'userTitlesController';

                    if (userModel.getCurrentUser()) {
                        $scope.welcome = 'Welcome ' + userModel.getCurrentUser();

                        var userTitleService = $resource('http://217.18.25.29:10070/profile/:userid/titles', {}, {
                            getUserTitles: {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'sessionId': userModel.getSession().trim(),
                                }
                            }
                        });

                        userTitleService.getUserTitles({
                            userid: userModel.getUserIdHash().trim()
                        }, function (resp) {
                            console.log(resp);
                        }, function (err) {
                            $location.path('/error');
                        });

                    }
                }]);
});