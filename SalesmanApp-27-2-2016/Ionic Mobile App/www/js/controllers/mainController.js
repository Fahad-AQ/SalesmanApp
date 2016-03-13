/**
 * Created by CuriousLabx on 10/27/2015.
 */
ionicApp.controller('mainController', function ($state,salesmanArrayService,$ionicPopup,$scope,$window) {
 $scope.logout = function() {
             salesmanArrayService.salesmanArray = null;
             salesmanArrayService.salesmanOrderArray = null;
             salesmanArrayService.arrayValue = true;
              $window.location.reload();
              $state.go('login')
        }
});