define(["app", "services/someNumbers"], function (app, someNumbersService) {
    'use strict';
    app.factory("questionsService",
            ["someNumbersService", function (someNumbersService) {
                    var allnumbers = someNumbersService.getNumbers();

                    function getSumOfNumbers() {
                        var sum = 0;
                        console.log('int', allnumbers);
                        for (var i in allnumbers) {
                            console.log(i);
                            sum += parseInt(allnumbers[i]);
                        }
                        return sum;
                    }

                    function getNoOfEvenNumbers() {
                        var noOfEvenNumbers = 0;
                        for (var i in allnumbers) {
                            if (allnumbers[i] % 2 === 0) {
                                noOfEvenNumbers++;
                            }
                        }
                        return noOfEvenNumbers;
                    }

                    function isPrimeNumber(givenNumber) {
                        if (givenNumber < 2) return false;
                        if (givenNumber !== Math.round(givenNumber)) return false;

                        var isPrime = true;

                        for (var i = 2; i <= Math.sqrt(givenNumber); i++) {
                            if (givenNumber % i === 0) {
                                isPrime = false;
                            }
                        }
                        return isPrime;
                    }

                    function getNoOfPrimeNumbers() {
                        var noOfPrimeNumbers = 0;
                        for (var i in allnumbers) {
                            if (isPrimeNumber(allnumbers[i])) {
                                noOfPrimeNumbers++;
                            }
                        }
                        return noOfPrimeNumbers;
                    }

                    function getSumPrimeNumbers() {
                        var sumOfPrimeNumbers = 0;
                        for (var i in allnumbers) {
                            if (isPrimeNumber(allnumbers[i])) {
                                sumOfPrimeNumbers += parseInt(allnumbers[i]);
                            }
                        }
                        return sumOfPrimeNumbers;
                    }

                    var storage = {
                        questionsAndAnswers: [
                            {'question': 'What is the sum total of the numbers', 'answer': getSumOfNumbers()},
                            {'question': 'How many even numbers are there', 'answer': getNoOfEvenNumbers()},
                            {'question': 'How many of numbers are prime numbers', 'answer': getNoOfPrimeNumbers()},
                            {'question': 'What do you get if you add all the prime numbers together', 'answer': getSumPrimeNumbers()},
                        ],
                    }

                    function getQuestionAndAnswers() {
                        return storage.questionsAndAnswers;
                    }

                    return {
                        getQuestionAndAnswers: getQuestionAndAnswers
                    }
                }]);
});