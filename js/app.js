angular.module('app',['ngRoute', 'services','controllers'])
.constant('CONFIG', {
    APIURL: "http://localhost:8000/api/",
    TEMPLATE_DIR:"templates/",
    ROL_CURRENT_USER: 0
})
.constant('ROLES', {
	ADMIN: {
		ROL:1,
		PATH:"/admin/users"
	}
})
.config(function ($routeProvider, $locationProvider, ROLES) {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/posts.html',
        controller: 'listPosts',
    })
    .when('/post/:id', {
        templateUrl: 'templates/post.html',
        controller: 'post',
    })
    .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'loginController',
    })
    .when('/admin/users', {
        templateUrl: 'templates/user/list.html',
        controller: 'listUsersController',
    })
    .when('/admin/users/create', {
        templateUrl: 'templates/user/form.html',
        controller: 'userCreateController',
    })

    .otherwise({
        redirectTo: '/'
    });
})

.run(["$rootScope", "$location", "CONFIG", "ROLES", function($rootScope, $location, CONFIG, ROLES){

	$rootScope.$on('$routeChangeStart', function (event, next) {
        if(!localStorage.getItem("token")){
            localStorage.removeItem("token"); 
            CONFIG.ROL_CURRENT_USER=null;  
        }else{
            CONFIG.ROL_CURRENT_USER = 1; 
        }
                
        if (next.data !== undefined){
            if(!next.data.authorized.indexOf(CONFIG.ROL_CURRENT_USER) !== -1){
                if(CONFIG.ROL_CURRENT_USER == 1){
                    $location.path(ROLES.ADMIN.PATH);
                }
            }
        }
    });
}]);