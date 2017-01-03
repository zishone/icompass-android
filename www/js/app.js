// Ionic iComPAsS App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'iComPAsS' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'iComPAsS.controllers' is found in controllers.js
// 'iComPAsS.sevices' is found in services.js
angular.module('iComPAsS', ['ionic', 'ngCordova', 'iComPAsS.constants', 'iComPAsS.config', 'iComPAsS.services', 'iComPAsS.controllers'])

.run(function($ionicPlatform, $ionicPopup, $window) {
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

    document.addEventListener('deviceready', function () {
      cordova.plugins.backgroundMode.setDefaults({
          title:  'iComPAsS',
          text:   'Running. Tap to open.'
      });
      cordova.plugins.backgroundMode.enable();
    }, false);
  });
});
