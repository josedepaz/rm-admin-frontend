(function () {
    angular
        .module('app')
        .factory('AdminServices', AdminServices);

    AdminServices.$inject = ['$resource'];
    var server = "/rm-server-web/rs";

    function AdminServices($resource) {
        return {
            getConfigurationResource: getConfigurationResource,
            getEntityConfigurationResource: getEntityConfigurationResource
        };

        function getConfigurationResource() {
            return $resource(server + '/config/:entity/:id');
        }
        
        
        function getEntityConfigurationResource() {
            return $resource(server + '/config/entity-configuration/:operation/:id');
        }

    }


})();