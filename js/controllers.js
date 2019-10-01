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
.controller('listUsersController', ['$scope', 'services', 'factories',function ($scope, services, factories) {
    services.listUsers().then(function (data) {
        $scope.data=data.data;
    }, 
    function (error, data) {
        console.log(error);
    });
    
    $scope.delete = function(id){
        
        services.deleteUser(id).then(function (data) {
            let idx = factories.index_of($scope.data, id, 'id');
            $scope.data.splice(idx,1)
        }, 
        function (error, data) {
            console.log(error);
        });
    }
}])
.controller('userCreateController', ['$scope', 'services', 'factories', '$location',function ($scope, services, factories, $location) {
    services.listTags().then(function (data) {
        $scope.data=data.data;
    }, 
    function (error, data) {
        console.log(error);
    });

    $scope.taggables = [];

    $scope.sendform=function(user){
        if($scope.taggables.length>0){
            user.taggables = $scope.taggables
        }

        services.createUser(user).then(function (data) {
            $location.path('/admin/users')
        }, 
        function (error, data) {
            $scope.errors = error.data.errors;
            $scope.msg = error.data.msg;
        });
    }

    $scope.tagChange = function (id, name){
        let idx = factories.index_of($scope.taggables, id, 'tag_id');
        idx > -1 ? $scope.taggables.splice(idx,1) : $scope.taggables.push({'tag_id':id, 'taggable_type':name});  
    }
    
}])
.controller('userEditController', ['$scope', 'services', 'factories', '$location', '$routeParams',function ($scope, services, factories, $location, $routeParams) {
    
    $scope.id = $routeParams.id; 
    $scope.taggables = [];

    services.listTags().then(function (data) {
        $scope.data=data.data;
    }, 
    function (error, data) {
        console.log(error);
    });

    services.getUser($scope.id).then(function (data) {
        $scope.user = data.data
        for(i=0; i<data.data.taggables.length; i++){
           $scope.taggables.push({'tag_id':data.data.taggables[i].tag_id, 'taggable_type': data.data.taggables[i].taggable_type})
        }
    }, 
    function (error, data) {
        console.log(error);
    });

    $scope.checked_object=function(id) {
        let i=0;
        for(i=0; i< $scope.taggables.length; i++){
          if(id == $scope.taggables[i].tag_id){
            return true;
          }
        }
        return false;
      };
    

    $scope.sendform=function(user){

        services.updateUser(user, $scope.id).then(function (data) {
            $location.path('/admin/users')
        }, 
        function (error, data) {
            $scope.errors = error.data.errors;
            $scope.msg = error.data.msg;
        });
    }

    $scope.tagChange = function (id, name){
        let idx = factories.index_of($scope.taggables, id, 'tag_id');
        idx > -1 ? $scope.taggables.splice(idx,1) : $scope.taggables.push({'tag_id':id, 'taggable_type':name});  
    }
    
}])
.controller('listPostsController', ['$scope', 'services', 'factories',function ($scope, services, factories) {
    services.listPosts().then(function (data) {
        $scope.data=data.data;
    }, 
    function (error, data) {
        console.log(error);
    });
    
    $scope.delete = function(id){
        
        services.deletePost(id).then(function (data) {
            let idx = factories.index_of($scope.data, id, 'id');
            $scope.data.splice(idx,1)
        }, 
        function (error, data) {
            console.log(error);
        });
    }
}])
.controller('postCreateController', ['$scope', 'services', 'factories', '$location',function ($scope, services, factories, $location) {
    services.listTags().then(function (data) {
        $scope.data=data.data;
    }, 
    function (error, data) {
        console.log(error);
    });

    $scope.taggables = [];

    $scope.sendform=function(post){
        if($scope.taggables.length>0){
            post.taggables = $scope.taggables
        }

        services.createPost(post).then(function (data) {
            $location.path('/admin/posts')
        }, 
        function (error, data) {
            $scope.errors = error.data.errors;
            $scope.msg = error.data.msg;
        });
    }

    $scope.tagChange = function (id, name){
        let idx = factories.index_of($scope.taggables, id, 'tag_id');
        idx > -1 ? $scope.taggables.splice(idx,1) : $scope.taggables.push({'tag_id':id, 'taggable_type':name});  
    }
    
}])
.controller('postEditController', ['$scope', 'services', 'factories', '$location', '$routeParams',function ($scope, services, factories, $location, $routeParams) {
    
    $scope.id = $routeParams.id; 
    $scope.taggables = [];

    services.listTags().then(function (data) {
        $scope.data=data.data;
    }, 
    function (error, data) {
        console.log(error);
    });

    services.getPosts($scope.id).then(function (data) {
        $scope.post = data.data
        for(i=0; i<data.data.taggables.length; i++){
           $scope.taggables.push({'tag_id':data.data.taggables[i].tag_id, 'taggable_type': data.data.taggables[i].taggable_type})
        }
    }, 
    function (error, data) {
        console.log(error);
    });

    $scope.checked_object=function(id) {
        let i=0;
        for(i=0; i< $scope.taggables.length; i++){
          if(id == $scope.taggables[i].tag_id){
            return true;
          }
        }
        return false;
      };
    

    $scope.sendform=function(post){

        services.updatePost(post, $scope.id).then(function (data) {
            $location.path('/admin/posts')
        }, 
        function (error, data) {
            $scope.errors = error.data.errors;
            $scope.msg = error.data.msg;
        });
    }

    $scope.tagChange = function (id, name){
        let idx = factories.index_of($scope.taggables, id, 'tag_id');
        idx > -1 ? $scope.taggables.splice(idx,1) : $scope.taggables.push({'tag_id':id, 'taggable_type':name});  
    }
    
}])
.controller('logoutController', ['$scope', '$location',function($scope, $location) {
    localStorage.removeItem("token");
    $location.path('/login');
}])