define(['app', 'models/user'], function (app, userModel) {
    'use strict';
    app.controller('signinController',
            ['$scope', '$resource', '$location', 'userModel',
                function ($scope, $resource, $location, userModel) {
                    $scope.what = 'signinController';

                    $scope.signin = function () {

                        var userSigninService = $resource('http://217.18.25.29:10070/signin/:username/:password', {}, {
                            signin: {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            }
                        });

                        userSigninService.signin({
                            username: $scope.username,
                            password: $scope.password
                        }, function (resp) {
                            console.log(resp);
                            userModel.setCurrentUser($scope.username);
                            userModel.setUserIdHash(resp.userId);
                            userModel.setSession(resp.sessionId);
                            $location.path('/userdetails');
                        }, function (err) {
                            $location.path('/error');
                        });

                    }
                }]);
});