/**
 * Created by CuriousLabx on 10/27/2015.
 */
ionicApp.controller('OrderSectionController', function ($ionicPopup,salesmanArrayService,GeoService,$timeout,$state) {
    var vm = this;
    salesmanArrayService.salesmanArray.OrderLocation = {};
    vm.coords = {};
    vm.showMapthis = false;
    vm.saveOrder = function (details){
        if (details && vm.showMapthis && salesmanArrayService.salesmanArray.OrderLocation ){
          console.log(salesmanArrayService.salesmanArray.OrderLocation)
            details.OrderLocation = salesmanArrayService.salesmanArray.OrderLocation;
            salesmanArrayService.orderItems(details)
            details = {} ;
             vm.details = {} ;
             vm.showMapthis = false;
             salesmanArrayService.salesmanArray.OrderLocation = {};
             $ionicPopup.alert({
                            title: 'Order Alert',
                            template: 'Order Successfully',
                        });
        }
        else{
            
              $ionicPopup.alert({
                            title: 'Alert',
                            template: 'Fill out all Field and Click Get Location',
                        });
        }
        
    }
    vm.showMap = function(coords) {    
      vm.syncMap();
         vm.showMapthis = true;
            salesmanArrayService.salesmanArray.OrderLocation = {};
            salesmanArrayService.salesmanArray.OrderLocation.latitude = (vm.coords.latitude) ? vm.coords.latitude : 24.8614622;
            salesmanArrayService.salesmanArray.OrderLocation.longitude = (vm.coords.longitude) ? vm.coords.longitude : 67.0099388; 
    var mapOptions = {
      center: { lat: salesmanArrayService.salesmanArray.OrderLocation.latitude, lng: salesmanArrayService.salesmanArray.OrderLocation.longitude},
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
  }
  vm.syncMap = function (){
      
    GeoService.getPosition()
    .then(function(position) {
      vm.coords = position.coords;    
        }, function(err) {
      console.log('getCurrentPosition error: ' + angular.toJson(err));
    });
  }
  vm.syncMap();  
  
})