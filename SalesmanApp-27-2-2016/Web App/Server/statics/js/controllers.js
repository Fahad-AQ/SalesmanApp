angular.module('starter')
.controller("signup",function($scope,$rootScope,$http,$state,$ionicPopup){
        $rootScope.user = {};
        $rootScope.currentUser = {};
        $scope.signup = function(user){
            if(user.name && user.email && user.password){
                   $http.post('/api/signup', user).success(function(respones){
                            if(respones == null) {
                                $ionicPopup.alert({
                                        title: 'Alert',
                                        template: 'Error In Signup',
                                    });
                            }
                            else { 
                                localStorage.setItem("token",respones.FirebaseToken)
                                $rootScope.currentUser = respones;
                                $http.get('/api/getCompany/' + $rootScope.currentUser._id).success(function(responeses){
                                        if(responeses == null) {
                                            console.log(responeses)
                                        }
                                        else {
                                            
                                            $rootScope.dataCompany = responeses;
                                        }
                        })
                                $state.go('home');
                                }
                })                
                            
                }
            else {
               $ionicPopup.alert({
                            title: 'Alert',
                            template: 'Fill out all Field',
                        });         
            }
         
       };             
    })
.controller("login",function($scope,$rootScope,$http,$state,$ionicPopup){
        $rootScope.user ={};  
        $rootScope.currentUser = {};
        $scope.login = function(user){
            if(user.email && user.password ){
                 $http.post('/api/login', user).success(function(respones){
                if(respones == null) {
                     $ionicPopup.alert({
                            title: 'Alert',
                            template: 'Error Email and Password',
                        });
                    console.log(respones)
                }
                else {
                    localStorage.setItem("token",respones.FirebaseToken)
                    $rootScope.currentUser = respones;
   
                     $http.get('/api/getCompany/' + $rootScope.currentUser._id).success(function(responeses){
                            if(responeses == null) {
                                console.log(responeses)
                            }
                            else {                               
                                $rootScope.dataCompany = responeses;                            
                            }
                        })
                    $state.go('home');
                }
              })               
                    }          
            else {           
                 $ionicPopup.alert({
                            title: 'Alert',
                            template: 'Fill out all Field',
                        });
            }
           }
        })
.controller("home",function($rootScope,$scope,$http,$state,$window,$ionicPopup,$interval,$firebaseArray,ionicToast){
         $rootScope.salesman = {};
        var ordersNew1 = new Firebase('https://salesmanapp.firebaseio.com/Orders'); 
         $scope.arrayCheck1 = $firebaseArray(ordersNew1);
         var number = $scope.arrayCheck1.length;
         $scope.showToast = function(){
                ionicToast.show('Order Added From ' + $scope.arrayCheck1[$scope.arrayCheck1.length-1].salesmanName, 'Right', false, 2500);
                };
        $interval(function () {
            if(number != $scope.arrayCheck1.length){
                 $scope.showToast();
                 number = $scope.arrayCheck1.length;              
            }
        },500)
         $rootScope.userSync = function(){
             var firebaseLocalToken = localStorage.getItem("token")
             $http.get('/api/getUser/' + firebaseLocalToken).success(function(respones){
                if(respones == null) {
                     console.log(respones)
                }
                else {
                     $rootScope.currentUser = respones;
                     $http.get('/api/getCompany/' + $rootScope.currentUser._id).success(function(responeses){
                            if(responeses == null) {
                                console.log(responeses)
                            }
                            else {
                                
                                $rootScope.dataCompany = responeses;
                            }
            })
                     
                }
            })
             
          }
        $rootScope.userSync();
        $scope.logout   = function(){
             localStorage.removeItem("token")
             $window.location.reload();
             $state.go('login');
   }
       
         $scope.addCompany   = function(data){
             if(data){ 
                 data.uid = $rootScope.currentUser._id  
                $http.post('/api/addCompany', {companyData : data }).success(function(respones){
                        if(respones == null) {                   
                            $rootScope.userSync();  
                        }
                        else {                                   
                             $ionicPopup.alert({
                            title: 'Company Added',
                            template: 'Company Added Successfully',
                        });  
                         $rootScope.userSync();         
                        }
                    })
                            
             }
             else {
                 $ionicPopup.alert({
                            title: 'Alert',
                            template: 'Fill out all Field',
                        });
             }
                     
   }
   
   
         $scope.addSalesmans  = function(salesman){
             if(salesman){
                 salesman.companyId = $rootScope.dataCompany._id          
                $http.post('/api/addSalesmans', {salesmanData : salesman }).success(function(respones){
                    $rootScope.salesman = {};
                    salesman = {};
                      $ionicPopup.alert({
                            title: 'Salesman Added',
                            template: 'Salesman Added Successfully',
                        });
                      
                    })
                            
             }
             else { 
                 $ionicPopup.alert({
                            title: 'Alert',
                            template: 'Fill out all Field',
                        });
             }
                     
   }
      $scope.showMapthis = false;
     $scope.getSaleman   = function(getSalesman){  
         console.log(getSalesman)     
            var refOrder = new Firebase('https://salesmanapp.firebaseio.com/'+getSalesman._id+'/Order/'); 
            $scope.arrayOrder = $firebaseArray(refOrder); 
                    }  
    $scope.showMap = function(coords) {
    $scope.location = {};
    $scope.location.latitude =(coords == undefined ||coords == 'undefined' ) ? 51.508742 : coords.latitude ;
    $scope.location.longitude =(coords == undefined ||coords == 'undefined') ?-0.120850 : coords.longitude;
    $scope.showMapthis = true;
    var mapOptions = {
      center: { lat: $scope.location.latitude, lng: $scope.location.longitude},
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
  }
     $scope.removeOrders  = function(Order,id){
           console.log(Order)
           Order.orderId = id
           Order.companyId = $rootScope.dataCompany._id  
           $http.post('http://localhost:3000/api/addOrderD2', {getOrderData2 : Order }).success(function(respones){
                        if(respones == null) {                   
                          console.log(respones)
                        }
                        else {      
                            console.log("Successfully")
                        }
                    })
    }
                      
})