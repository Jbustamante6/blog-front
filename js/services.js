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
            }); 
	   return deferred.promise;
    };

    this.listUsers=function () {
        var token=JSON.parse(localStorage.getItem("token"));
        var deferred = $q.defer();
         $http({
             method: "get",
             headers:{  'content-type':'application/json',
                        Authorization:'Bearer '+token       
                    },
             url: CONFIG.APIURL+'admin/user',
             }).then(function(result, status) {
                 deferred.resolve(result);
             }); 
        return deferred.promise;
     };
})
