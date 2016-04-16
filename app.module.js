(function () {
    'use strict';

    angular.module('app', ['ngRoute', 'ngResource'])
        .config(configuration);

    configuration.$inject = ['$routeProvider'];

    function configuration($routeProvider) {
	       $routeProvider
            .when('/scores/', {
                templateUrl: 'scores/scores.html',
                controller: 'scoresController',
                controllerAs: 'scoresCtrl'
            })
            .when('/scores/rally/:rallyId/questions/', {
                templateUrl: 'scores/questions.html',
                controller: 'questionsController',
                controllerAs: 'questionsCtrl'
            })
            .when('/scores/rally/:rallyId/questions/:questionId/answers', {
                templateUrl: 'scores/answers.html',
                controller: 'answersController',
                controllerAs: 'answersCtrl'
            })
            .when('/config', {
                templateUrl: 'config/options.html',
                controller: 'MainAdminController',
                controllerAs: 'vm'
            })
            .when('/config/:configId', {
                templateUrl: 'config/list.html'
            })
            .when('/config/:configId/:elementId', {
                templateUrl: 'config/edit.html'
            })
            .when('/rankings/', {
                templateUrl: 'rankings/rankings.html',
                controller: 'rankingsController',
                controllerAs: 'rankingsCtrl'
            })
            .when('/rankings/:rallyId', {
                templateUrl: 'rankings/ranking.html',
                controller: 'rankingController',
                controllerAs: 'rankingCtrl'
            })
            .when('/new-question', {
                templateUrl: 'config/questions.html',
                controller: 'rankingController',
                controllerAs: 'rankingCtrl'
            })
            .otherwise({
                templateUrl: 'home/home.html',
                controller: 'homeController',
                controllerAs: 'homeCtrl'
            });
    }
})();