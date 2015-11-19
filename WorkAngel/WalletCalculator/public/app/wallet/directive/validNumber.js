walletApp.directive('validNumber',
        function() {
            return {
                require: "ngModel",
                link: function(scope, elm, attrs, ctrl) {

                    // Posive numner and floating number check
                    var regex = /^[0-9.]+$/;
                    var validator = function(value) {
                        ctrl.$setValidity('validNumber', regex.test(value));
                        return value;
                    };

                    ctrl.$parsers.unshift(validator);
                    ctrl.$formatters.unshift(validator);
                }
            };
        });
