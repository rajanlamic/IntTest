define(['app', 'services/someNumbers', 'services/questions'], function (app) {
    'use strict';
    app.controller('homeController',
            ['$scope', 'someNumbersService', 'questionsService', '$resource',
                function ($scope, someNumbersService, questionsService, $resource) {
                    
                    $scope.numbers = someNumbersService.getNumbers();
                    $scope.questionsAndAnswers = questionsService.getQuestionAndAnswers();
                }]);
});
