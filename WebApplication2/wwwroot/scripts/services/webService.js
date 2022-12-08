// Import variables if present
if (window)
    Object.assign(__env, window.__env);

function webService($http, $q, localStorageService) {
    this.units = function () {
        return $http.get(__env.apiUrl + 'api/Calculate/Units').then(function (result) {
            return result;
        });
    };

    this.createCalculate = function (Calculate) {
        return $http.post(__env.apiUrl + 'api/Calculate', Calculate);
    };
}

webService.$inject = ['$http', '$q', 'localStorageService'];