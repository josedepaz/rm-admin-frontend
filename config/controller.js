(function () {
    'use strict';
    angular
        .module('app')
        .controller('MainAdminController', MainAdminController)
        .controller('AdminListController', AdminListController)
        .controller('AdminEditElementController', AdminEditElementController);
    

    MainAdminController.$inject = ['AdminServices', '$routeParams', '$location'];
    
    
    function MainAdminController(AdminServices, $routeParams, $location) {
    	var self = this;
        var pageSize = 100;
        var position = 0;
        findEntitiesConfiguration();
        
        
        function findEntitiesConfiguration(){
            self.entities = AdminServices.getConfigurationResource().query({"entity":"entity-configuration", "position":position, "limit": pageSize});
        };  
    }
    
    AdminListController.$inject = ['AdminServices', '$routeParams', '$location'];
    function AdminListController(AdminServices, $routeParams, $location) {
    	var self = this;
        var pageSize = 10;
        var position = 0;
        var configId = $routeParams.configId;
        
        self.viewElements = viewElements;
        self.reloadView = reloadView;
        self.subview = false;
        
        findEntityConfiguration();
        
        function findEntityConfiguration(){
            self.entity = AdminServices.getConfigurationResource().get({"entity":"entity-configuration", "id":configId}, function(){
                self.list = AdminServices.getConfigurationResource().query({"entity": self.entity.resourceName,  "position":position, "limit": pageSize});
            });
        };  
        
        function viewElements(list, field){
            self.list = list;
            self.entity = AdminServices.getEntityConfigurationResource().get({"operation":"name", "id":field.configuration});
            self.subview = true;
        };
        
        function reloadView(){
            self.subview = false;
            findEntityConfiguration();
        };
        
    }
    
    AdminEditElementController.$inject = ['AdminServices', '$routeParams', '$location'];
    function AdminEditElementController(AdminServices, $routeParams, $location) {
    	var self = this;
        var pageSize = 100;
        var position = 0;
        var configId = $routeParams.configId;
        var elementId = $routeParams.elementId;
        
        self.save = save;
        self.back = back;
        self.viewElements = viewElements;
        self.editView = true;
        self.options = {};
        
        findEntityConfiguration();
        function findEntityConfiguration(){
            self.entity = AdminServices.getConfigurationResource().get({"entity":"entity-configuration", "id":configId}, function(){
                if (elementId === "new") {
                    self.element = {};
                } else {
                    self.element = AdminServices.getConfigurationResource().get({"entity": self.entity.resourceName,  "id": elementId});
                }
                angular.forEach(self.entity.fields, function(value, index){
                    if(value.fieldType === 'OBJECT'){
                        var entity = AdminServices.getEntityConfigurationResource().get({"operation":"name", "id":value.configuration}, function(){
                            self.options[value.fieldName] = AdminServices.getConfigurationResource().query({"entity": entity.resourceName, "position":position, "limit": pageSize});
                        });
                    }
                });
            });
        };  
        
        function save(){
            AdminServices.getConfigurationResource().save({"entity": self.entity.resourceName}, self.element);
        };
        
        function viewElements(list, field){
            self.editView = false;
            if(!list){
                self.element[field.fieldName] = [];
            } 
            list = self.element[field.fieldName];
            self.detailEntity = AdminServices.getEntityConfigurationResource().get({"operation":"name", "id":field.configuration});
        };
        
        function back(){
            self.editView = true;
        };
        
    }
    
})();