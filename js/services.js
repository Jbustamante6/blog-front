angular.module('services', [])
.service('services',function ( $http, $q, CONFIG) {

    this.listPost=function () {
      
        var deferred = $q.defer();
        $http({
	        method: "get",
	        headers:{'content-type':'application/json',
            },
            url: CONFIG.APIURL+'post',
            }).then(function(result, status) {
                deferred.resolve(result);
		    },function(error, result){
                deferred.reject(error)
            }); 
	   return deferred.promise;
    };

    this.getPost=function (id) {
        var deferred = $q.defer();
        $http({
	        method: "get",
	        headers:{'content-type':'application/json',
            },
            url: CONFIG.APIURL+'post/'+id,
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
	   return deferred.promise;
    };

    this.auth=function (user) {
        var deferred = $q.defer();
        $http({
	        method: "Post",
            headers:{'content-type':'application/json'},
            data:user,
            url: CONFIG.APIURL+'login',
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
	   return deferred.promise;
    };

    this.listUsers=function () {
        var token=JSON.parse(localStorage.getItem("token"));
        var deferred = $q.defer();
         $http({
            method: "get",
            headers:{'content-type':'application/json',Authorization:'Bearer '+token},
            url: CONFIG.APIURL+'admin/user',
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
        return deferred.promise;
    };

    this.listTags=function () {
        var token=JSON.parse(localStorage.getItem("token"));
        var deferred = $q.defer();
        $http({
            method: "get",
            headers:{  'content-type':'application/json',
                    Authorization:'Bearer '+token       
                },
            url: CONFIG.APIURL+'admin/tag',
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
    return deferred.promise;
    };

    this.createUser=function (user) {
        var token=JSON.parse(localStorage.getItem("token"));
        var deferred = $q.defer();
        $http({
	        method: "Post",
            headers:{'content-type':'application/json',Authorization:'Bearer '+token},            
            data:user,
            url: CONFIG.APIURL+'admin/user',
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
	   return deferred.promise;
    };

    this.deleteUser=function (id) {
        var token=JSON.parse(localStorage.getItem("token"));
        var deferred = $q.defer();
        $http({
	        method: "delete",
            headers:{'content-type':'application/json',Authorization:'Bearer '+token},            
            url: CONFIG.APIURL+'admin/user/'+id,
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
	   return deferred.promise;
    };

    this.getUser=function (id) {
        var token=JSON.parse(localStorage.getItem("token"));
        var deferred = $q.defer();
        $http({
	        method: "get",
            headers:{'content-type':'application/json',Authorization:'Bearer '+token},            
            url: CONFIG.APIURL+'admin/user/'+id,
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
	   return deferred.promise;
    };

    this.updateUser=function (user, id) {
        var token=JSON.parse(localStorage.getItem("token"));
        var deferred = $q.defer();
        $http({
	        method: "put",
            headers:{'content-type':'application/json',Authorization:'Bearer '+token},            
            data:user,
            url: CONFIG.APIURL+'admin/user/'+id,
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
	   return deferred.promise;
    };

    this.listPosts=function () {
        var token=JSON.parse(localStorage.getItem("token"));
        var deferred = $q.defer();
         $http({
            method: "get",
            headers:{'content-type':'application/json',Authorization:'Bearer '+token},
            url: CONFIG.APIURL+'admin/post',
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
        return deferred.promise;
    };

    this.deletePost=function (id) {
        var token=JSON.parse(localStorage.getItem("token"));
        var deferred = $q.defer();
        $http({
	        method: "delete",
            headers:{'content-type':'application/json',Authorization:'Bearer '+token},            
            url: CONFIG.APIURL+'admin/post/'+id,
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
	   return deferred.promise;
    };

    this.createPost=function (post) {
        var token=JSON.parse(localStorage.getItem("token"));
        var deferred = $q.defer();
        $http({
	        method: "Post",
            headers:{'content-type':'application/json',Authorization:'Bearer '+token},            
            data:post,
            url: CONFIG.APIURL+'admin/post',
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
	   return deferred.promise;
    }

    this.getPosts=function (id) {
        var token=JSON.parse(localStorage.getItem("token"));
        var deferred = $q.defer();
        $http({
	        method: "get",
            headers:{'content-type':'application/json',Authorization:'Bearer '+token},            
            url: CONFIG.APIURL+'admin/post/'+id,
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
	   return deferred.promise;
    };

    this.updatePost=function (post, id) {
        var token=JSON.parse(localStorage.getItem("token"));
        var deferred = $q.defer();
        $http({
	        method: "put",
            headers:{'content-type':'application/json',Authorization:'Bearer '+token},            
            data:post,
            url: CONFIG.APIURL+'admin/post/'+id,
            }).then(function(result, status) {
                deferred.resolve(result);
            },function(error, result){
                deferred.reject(error)
            }); 
	   return deferred.promise;
    };

})
