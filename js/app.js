// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// controller for list of images
.controller('listController', ['$scope', function($scope){
   $scope.dealToggle = false;
   $scope.searchClicked = false;
   $scope.categories = ["cat1","cat2","cat3","cat4", "cat5", "cat6"];
   $scope.imglist = [
                      {url:"https://dtex4kvbppovt.cloudfront.net/images/1ddd27484ee94475bff83cf81d2bc50d7762508c.13811.png", category : "cat1"},
                      {url:"https://dtex4kvbppovt.cloudfront.net/images/720121e7462d8c7863b4dd8fa7b5c1089b5f5fb2.33862.png", category : "cat2"},
                      {url:"https://dtex4kvbppovt.cloudfront.net/images/877f1c561e735f7b9f419ff9ac79eb8c7481119d.16744.png", category : "cat3"},
                      {url:"https://dtex4kvbppovt.cloudfront.net/images/d11ba0b3095bb19d8092cd29be9cbb9e197671ea.28088.png", category : "cat4"}
                    ]; 
    // toggle selectedCategories 
    $scope.toggleSelected = function(cat){
        if ($scope.selectedCategories.indexOf(cat) !== -1){
          $scope.selectedCategories.pop(cat);
        }
        else {
          $scope.selectedCategories.push(cat);
        };
        $scope.selectedCategories["cat1"];
    };
    $scope.selectedCategories = [];
   $scope.filterByCat = function(image) {
      // body...
      if ($scope.selectedCategories.length > 0) {
        return ($scope.selectedCategories.indexOf(image.category) !== -1);
      }
      else {
        return true;
      }
  };
}])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.account-settings',{
    url:'/account/settings',
    views:{
      'tab-account' :{
        templateUrl : 'templates/account-settings.html'      }
    }
  })
  .state('tab.account-wallet',{
    url:'/account/wallet',
    views:{
      'tab-account' :{
        templateUrl : 'templates/account-wallet.html',
        controller: 'WalletCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
