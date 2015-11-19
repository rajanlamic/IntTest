walletApp.controller('calculatorController',
        ['$scope', 'operationService', 'initialBalance',
            function($scope, operationService, initialBalance) {

                function add() {
                    var errorMessage = isValid().message; // some extra validation
                    if (errorMessage) {
                        alert(errorMessage);
                    } else {
                        operationService.add({
                            'uid': new Date().getTime(), // this should be expanded further
                            'date': new Date(),
                            'amount': $scope.valueToAdd
                        });
                    }
                }

                function remove(index) {
                    operationService.remove(operationService.get()[index]);
                }
                
                function edit(index, newContent) {
                    operationService.edit(operationService.get()[index], newContent);
                }

                $scope.walletCalculator = {
                    add: add,
                    remove: remove,
                    edit:edit,
                    walletContents: operationService.get()
                };

                $scope.walletCalculator.getBalance = function() {
                    var total = 0;
                    for (var i = 0; i < $scope.walletCalculator.walletContents.length; i++) {
                        total += parseFloat($scope.walletCalculator.walletContents[i].amount);
                    }
                    return total + initialBalance;
                }

                function isValid() {
                    var error = {
                        message: false
                    };

                    if (isNaN($scope.valueToAdd)) {
                        error.message = 'Please input valid numner!';
                    } else if ($scope.valueToAdd < 0) {
                        error.message = 'Please input positive number!';
                    }

                    return error;
                }

            }]);