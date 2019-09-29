angular.module('controllers', [])
.controller('listPosts', ['$scope', 'services',function ($scope, services) {
    services.listPost().then(function (data) {
        $scope.data=data;
    }, 
    function (error, data) {
        console.log(error);
    });
    
}])
.controller('post', ['$scope', 'services', '$routeParams',function ($scope, services, $routeParams) {
    services.getPost($routeParams.id).then(function (data) {
        $scope.data=data;
    }, 
    function (error, data) {
        console.log(error);
    });
    
}])
.controller('loginController', ['$scope', '$location','services','CONFIG','ROLES', function ($scope, $location, services, CONFIG, ROLES) {
   
    if( localStorage.getItem("token") !== null){
        CONFIG.ROL_CURRENT_USER = 1
        $location.path(ROLES.ADMIN.PATH);
    }
    $scope.login=function (user) {
        services.auth(user).then(function (data) {
     
        localStorage.setItem("token",JSON.stringify(data.data.token));
        CONFIG.ROL_CURRENT_USER = 1;
           
            if(CONFIG.ROL_CURRENT_USER == 1)
    		{
    			$location.path(ROLES.ADMIN.PATH);
    		}          
           
        }, function (error) {
            //console.log(error.data.error)
        });
    };
}])

.controller('listUsersController', ['$scope', 'services',function ($scope, services) {
    services.listUsers().then(function (data) {
        $scope.data=data.data;
    }, 
    function (error, data) {
        console.log(error);
    });
    
}])
