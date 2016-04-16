(function(){
    'use strict';
    
    angular.module('app')
        .controller('rankingController', rankingController);
        
    rankingController.$inject = ['$http'];
        
    function rankingController($http) {
        var self = this;
        
        self.rallies = [];
        
        activate();
        
        
        function activate(){
            $http.get('/rm-server-web/rs/rallies').then(getRalliesDone, getRalliesFail);
        }
        
        function getRalliesDone(result) {
            self.rallies = result.data;
        }
        
        function getRalliesFail(error) {
            console.log(error);
        }
    }
})();