(function () {
    'use strict';
    angular
            .module('app.admin')
            .controller('EditAdminController', EditAdminController);

    EditAdminController.$inject = ['AdminServices', '$routeParams'];

    function EditAdminController(AdminServices, $routeParams) {
        var self = this;


        self.findObject = function() {
           AdminServices.findRallyObject($routeParams.objectId).then(function(result){
                self.object = result;
           });
        };
        self.findObject();
    }
})();