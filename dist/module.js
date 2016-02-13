angular.module('app.dynamicConfig', ['ngRoute', 'ngHandsontable', 'ngResource'])
	.config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.
              when('/config', {
                templateUrl: 'partials/options.html'
              }).
              when('/config/:configId', {
                templateUrl: 'partials/list.html'
              }).
              when('/config/:configId/:elementId', {
                templateUrl: 'partials/edit.html'
              }).
              otherwise({
                redirectTo: '/config'
              });
        }]);