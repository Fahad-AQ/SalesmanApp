/**
 * Created by CuriousLabx on 10/27/2015.
 */
ionicApp.controller('loginController', function ($http,salesmanArrayService,$ionicPopup,$scope,$state) {
    $scope.login =function (salesmans){
        if(salesmans){   
                $http.post('http://localhost:3000/api/getSalesman', {getSalesmanData : salesmans }).success(function(respones){
                                if(!(respones[0])){  
                                        console.log(respones)
                                         $ionicPopup.alert({
                                            title: 'Error',
                                            template: 'Cant Find Email and Password',
                                        });         
                                }
                              
                                else {
                                    var matchFound = false;
                                         for(var i = 0 ; i< respones[0].Salesman.length;i++){                                        
                                         if(respones[0].Salesman[i].email == salesmans.email && respones[0].Salesman[i].password == salesmans.password){
                                        matchFound = true;
                                         salesmanArrayService.salesmanArray = respones[0].Salesman[i];                              
                                         salesmanArrayService.syncArray(respones[0].Salesman[i]._id)                                                                                  
                                        console.log(respones)
                                        $state.go('app.dashboard')
                                        break;
                                        }                                                                                                        
                                    }
                                     if(matchFound === false ) {
                                            $ionicPopup.alert({
                                            title: 'Error',
                                            template: 'Wrong Password',
                                        });       
                                        }     
                                                  
                                  }                                                                    
                                }               
                )}
    }
})
    