define(['app', 'models/user'], function (app, userModel) {
    'use strict';
    app.controller('userDetailsController',
            ['$scope', 'userModel', '$resource', '$location',
                function ($scope, userModel, $resource, $location) {
                    if (userModel.getCurrentUser()) {
                        $scope.welcome = 'Welcome ' + userModel.getCurrentUser();

                        var userDetailService = $resource('http://217.18.25.29:10070/profile/' + userModel.getUserIdHash().trim(), {}, {
                            getUserDetails: {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'sessionId': userModel.getSession().trim(),
                                }
                            }
                        });

                       var user = userDetailService.getUserDetails({
                        }, function (resp) {
//                        $scope.searchResult = resp.items;
//                            console.log(resp);
//                                userModel.setCurrentUser($scope.username);
//                                $location.path('/userdetails');
                        }, function (err) {
//                        $scope.searchResult = {}
//                            console.log(err);
                            $location.path('/error');
                        });

                    }
                }]);
});