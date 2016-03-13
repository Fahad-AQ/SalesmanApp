/**
 * Created by CuriousLabx on 10/28/2015.
 */
ionicApp.controller('dashboardController', function (salesmanArrayService,$interval,$timeout,$state,$scope,$firebaseArray) {
    var vm = this;
    vm.showMaplocationthis = false;
    $interval(function () {
        if(salesmanArrayService.arrayValue == true) {
        vm.arrayDashboard = []
        vm.arrayDashboard = salesmanArrayService.salesmanOrderArray
    }
    },500)
    
    vm.arrayDashboard = salesmanArrayService.salesmanOrderArray;
      vm.getLocationOrder = function(coords) {
           vm.showMaplocationthis = true;
 salesmanArrayService.salesmanArray.OrderLocation = {};
 salesmanArrayService.salesmanArray.OrderLocation.latitude = (coords == undefined ||coords == 'undefined' ) ? 24.8614622 : coords.latitude ;
 salesmanArrayService.salesmanArray.OrderLocation.longitude = (coords == undefined ||coords == 'undefined') ? 67.0099388 : coords.longitude;
    vm.showMapthis = true;
    var mapOptions = {
      center: { lat: salesmanArrayService.salesmanArray.OrderLocation.latitude, lng: salesmanArrayService.salesmanArray.OrderLocation.longitude},
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('googleMaplocation'), mapOptions);
  }
});