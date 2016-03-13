/**
 * Created by CuriousLabx on 10/15/2015.
 */
ionicApp.service('salesmanArrayService', function ($http,$firebaseArray) {
    var vm = this;
    vm.salesmanArray = [];
     vm.arrayValue = false;
    console.log(vm.salesmanArray._id)
    vm.syncArray = function (id) {
        vm.refOrder = new Firebase('https://salesmanapp.firebaseio.com/'+id+'/Order/'); 
       vm.salesmanOrderArray = $firebaseArray(vm.refOrder);   
    }   
    vm.orderItems = function(items){
        vm.salesmanArray.salesmanOrder = items
        console.log(items)
           $http.post('http://localhost:3000/api/addOrder', {getOrderData : vm.salesmanArray }).success(function(respones){
                        if(respones == null) {                   
                          console.log(respones)
                        }
                        else {      
                            console.log(respones)                                                                                  
                             items = {};
                             vm.salesmanArray.salesmanOrder = {};
                        }
                    })
    }
   }).factory('GeoService', function($ionicPlatform, $cordovaGeolocation) {

  var positionOptions = {timeout: 10000, enableHighAccuracy: true};

  return {
    getPosition: function() {
      return $ionicPlatform.ready()
        .then(function() {
          return $cordovaGeolocation.getCurrentPosition(positionOptions);
        })
    }
  };

});



