// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('myApp', ['ionic', 'directives', 'controllers','services'])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // Each tab has its own nav history stack:

            .state('list', {
                url: "/list",
                templateUrl: 'ticket/list.html',
                controller: 'listCtrl'
            })

            .state('order', {
                url: "/order",
                templateUrl: 'ticket/orderList.html',
                controller: 'listCtrl'
            })

            .state('account', {
                url: "/account",
                templateUrl: 'ticket/account.html',
                controller: 'accountCtrl'
            })

            .state('card', {
                templateUrl: 'ticket/card.html'
            })

            .state('detail', {
                url: "/detail?id",
                templateUrl: 'ticket/detail.html',
                controller: 'detailCtrl'
            })

            .state('map', {
                url: "/map",
                templateUrl: 'ticket/map.html',
                controller: 'mapCtrl'

            })

            .state('user', {
                url: "/user",
                templateUrl: 'ticket/user.html',
                controller: 'accountCtrl'
            })

            .state('test', {
                url: "/test",
                templateUrl: 'ticket/test.html',
                controller: 'listCtrl'
            })

            .state('camera', {
                url: "/camera",
                templateUrl: 'ticket/camera.html',
                controller: 'cameraCtrl'
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/list');

    })

