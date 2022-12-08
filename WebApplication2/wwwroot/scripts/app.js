var app = angular.module('WebApplication',
    ['ngRoute', 'ngCookies', 'LocalStorageModule', 'chieffancypants.loadingBar', 'ngAnimate', 'ui.bootstrap', 'ngSanitize', 'ngIdle', 'oc.lazyLoad',
        'pascalprecht.translate']);

// Import variables if present
if (window)
    Object.assign(__env, window.__env);

app.service('webService', webService);


app.config(function ($routeProvider, $httpProvider, $locationProvider, $ocLazyLoadProvider, cfpLoadingBarProvider, KeepaliveProvider, IdleProvider) {
    
    $routeProvider.when(__env.basePath, {
        templateUrl: '/scripts/views/Home.html?v=' + generateUID(),
        controller: 'HomeController',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('/scripts/controllers/HomeController.js');
            }]
        }
    });

    $routeProvider.otherwise({
        redirectTo: __env.basePath
    });

    $locationProvider.html5Mode(true).hashPrefix('!');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    cfpLoadingBarProvider.includeSpinner = true;
});

var serviceBase = __env.apiUrl;

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

app.run();