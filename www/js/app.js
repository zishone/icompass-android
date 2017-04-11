// Ionic iComPAsS App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'iComPAsS' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'iComPAsS.controllers' is found in controllers.js
// 'iComPAsS.sevices' is found in services.js
angular.module('iComPAsS', ['ionic', 'chart.js', 'rzModule', 'ngSanitize', 'iComPAsS.constants', 'iComPAsS.config', 'iComPAsS.services', 'iComPAsS.controllers'])

.run(function($ionicPlatform, $state, $ionicHistory, ONESIGNAL) {
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

    var notificationOpenedCallback = function(jsonData) {
      alert("Notification opened:\n" + JSON.stringify(jsonData.notification.payload.additionalData.push_type));

      switch (jsonData.notification.payload.additionalData.push_type) {
        case ONESIGNAL.message_received:
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('menu.messages').then(function() {
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
          });
          break;
        case ONESIGNAL.esas_enabled:
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('menu.take-esas').then(function() {
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
          });
          break;
        case ONESIGNAL.esas_answered:
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('menu.list-of-patients').then(function() {
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
          });
          break;
        default:

      }
    };

    //onsignal notification
    if (window.plugins && window.plugins.OneSignal) {
      window.plugins.OneSignal
      .startInit(ONESIGNAL.appId)
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
    }

    if (window.cordova && window.cordova.InAppBrowser) {
      window.open = window.cordova.InAppBrowser.open;
    }

  });

});
