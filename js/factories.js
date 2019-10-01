angular.module('factories', [])

.factory("factories",[function () {
    return{
        index_of:function (myObject, id, field) {
            let i=0, idx=-1;
            for(i=0; i<myObject.length; i++){
                if(myObject[i][field]==id){
                    idx=i;
                    break;
                }
            }
            return idx;
        }
    }
}])
