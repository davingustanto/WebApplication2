'use strict';
angular.module('WebApplication').controller('HomeController', ['$scope', '$http', '$sce', '$location', '$ocLazyLoad', '$rootScope', '$timeout', 'webService', 'localStorageService',
    function ($scope, $http, $sce, $location, $ocLazyLoad, $rootScope, $timeout, webService, localStorageService) {
        $scope.Units = [];

        $scope.Calculate = {
            unit: '',
            quantity: 0,
            price: 0,
            discount: ''
        };

        $scope.Results = '';

        webService.units().then(function (results) {
            $scope.Units = results.data;
        });

        $scope.Send = function () {
            webService.createCalculate($scope.Calculate).then(function (result) {
                $scope.Results = result.data;
                console.log(result.data);
            });
        };
    }]);