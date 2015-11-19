define(['app', 'services/userregister'], function (app) {
    'use strict';
    app.controller('registerController',
            ['$scope', 'userRegisterService', '$resource',
                function ($scope, userRegisterService, $resource) {
                    $scope.what = 'registerController';
                    
                    $scope.register = function () {
                        
                        var userRegisterService = $resource('http://217.18.25.29:10070/register/' + $scope.username, {}, {
                            register: {
                                method: 'PUT',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            }
                        });

                        userRegisterService.register({
                            lastName: $scope.lastname,
                            phoneNumber: $scope.phonenumber,
                            firstName: $scope.firstname,
                            password: $scope.password
                        }, function (resp) {
//                        $scope.searchResult = resp.items;
                            console.log(resp);
                            $location.path('/signin');
                        }, function (err) {
//                        $scope.searchResult = {}
                            console.log(err);
                        });

                        alert('register');
                    }
                }]);
});