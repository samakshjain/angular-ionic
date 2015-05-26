// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ngCookies', 'ionic', 'starter.controllers', 'starter.services'])

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

.config(function($stateProvider, $urlRouterProvider) {
    openFB.init({
        appId: '1571419239784359'
    });
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    


    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })
    .state('account-dash', {
        url: '/account',
        templateUrl: 'templates/account-dash.html',
        controller: 'AccountCtrl'
    })
    .state('item-details', {
        url: '/account/:itemId',
        templateUrl: 'templates/itemPage.html',
        controller: 'ItemCtrl'
    })

    .state('account-settings', {
        url: '/account/settings/',
        templateUrl: 'templates/account-settings.html',
        controller: 'SettingCtrl'
    })

    .state('account-wallet', {
        url: '/account/wallet/',
        templateUrl: 'templates/account-wallet.html',
        controller: 'WalletCtrl'
    })
    .state('message-detail', {
        url: '/acount/inbox/:chatId',
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
    })
    .state('favorites', {
        url: '/account/favs/',
        templateUrl: 'templates/favorites.html',
        controller: 'favCtrl'
    })
    .state('createCoupon', {
        url: '/account/wallet/createCoupon',
        templateUrl: 'templates/coupon-create.html',
        controller: 'couponCreateCtrl'
    })
    .state('coupon-details',{
        url:'/coupon/:id',
        templateUrl: 'templates/coupon-details.html',
        controller: 'couponDetailsController',
    })
    .state('account-inbox', {
        url: '/account/inbox/',
        templateUrl: 'templates/account-inbox.html',
        controller: 'messageCtrl'
    })
    .state('mission-details',{
        url:'/account/mission/:id',
        templateUrl:'templates/mission-details.html',
        controller: 'missionDetailController'
    })
   .state('account-details',{
       url:'/account/account-details/',
       templateUrl:'templates/account-details.html',
       controller: 'accountDetailController'
   })
   .state('auction-details',{
       url:'/account/auction_d/:id',
       templateUrl:'templates/auction-details.html',
       controller: 'auctionDetailController'
   })
   .state('notification_center',{
       url:'/account/notification/',
       templateUrl:'templates/notification_center.html',
       controller: 'notificationcenterController'
   }) 
   .state('instructions',{
       url:'/account/instruction/',
       templateUrl:'templates/instructions.html',
       controller: 'instructions'
   })
   .state("about",{
      url:'/account/about/',
      templateUrl:'templates/about-freecoupon.html',
      controller:'aboutController'
   })
    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});