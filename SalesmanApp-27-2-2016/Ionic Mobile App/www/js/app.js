// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var ionicApp = angular.module('starter', ['ionic','ngCordova','firebase','ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
        .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "template/menu.html",
          controller : 'mainController'
        })
        .state('login', {
            url: "/login",
            templateUrl: "template/login.html",
            controller : 'loginController'
        })
        .state('app.dashboard', {
          url: "/dashboard",
          templateUrl: "template/dashboard.html",
          controller : 'dashboardController as dash'
        })
        .state('app.OrderSection', {
          url: "/OrderSection",
          templateUrl: "template/OrderSection.html",
          controller : 'OrderSectionController as read'
        })
        .state('app.setting', {
          url: "/setting",
          templateUrl: "template/setting.html"
        })

      $urlRouterProvider.otherwise('/login');
  });
