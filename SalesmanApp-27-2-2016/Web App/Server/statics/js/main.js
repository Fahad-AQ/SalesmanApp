// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic',"firebase","ionic-toast"]).config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('signup', {
      url: "/signup",
      templateUrl: "templates/signup.html",
      controller: "signup"
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "login"
    })
    .state('home', {
      url: "/",
      templateUrl: "templates/home.html",
      controller: "home",
      loginCompulsory : true
    })
  
}).run(function($rootScope,$state){
    $rootScope.$on('$stateChangeStart',function(event,toState){
        var firebaseLocalToken = localStorage.getItem("token")
        if(toState.loginCompulsory && !firebaseLocalToken){            
            event.preventDefault() 
            $state.go("login")
        }
        
    })
});