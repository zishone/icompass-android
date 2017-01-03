angular.module('iComPAsS.controllers')

.controller('AppCtrl', function($scope, $rootScope, $window, $state, $ionicHistory, $ionicLoading, $ionicPopup, $cordovaLocalNotification, AuthService, API, USER_ROLES) {

  $scope.doLogout = function() {
    console.log('Doing logout');

    // Destroy saved credentials
    AuthService.logout();

    // Change state into login
    $state.go('login').then(function(){
      $scope.clearBackView();
      $window.location.reload();
    });
  };

  $scope.clearBackView = function(){
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
  };

  $scope.showLoading = function(){
    $ionicLoading.show({
      template: '<div style="height:100vh;width:100vw;">' +
                  '<img src="img/spinner.gif" alt="Loading..." width="100px" style="position:relative;top:40vh"/>' +
                '</div>',
      noBackdrop: true
    });
  };

  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  $scope.alertPopup = function(title, template){
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: template,
      cssClass: 'alert-popup'
    });
  };

  $scope.tab = 1;

  $scope.setTab = function(newTab){
    $scope.tab = newTab;
  };

  $scope.isSet = function(tabNum){
    return $scope.tab === tabNum;
  };

  $scope.isDoctor = function(){
    return AuthService.role() === USER_ROLES.doctor;
  };

  $scope.isPatient = function(){
    return AuthService.role() === USER_ROLES.patient;
  };

  $scope.previous = {};

  $scope.notify = function(id, title, message, previous_id) {
    $cordovaLocalNotification.isPresent(id).then(function (present) {
      if (!present) {
        $cordovaLocalNotification.add({
          id: id,
          message: message,
          title: title,
          led: 'FFFFFF'
        });
      }else if ($scope.previous[previous_id] !== id) {
        $cordovaLocalNotification.update({
          id: id,
          message: message,
          title: title
        });
      }

      $scope.previous[previous_id] = id;

      $rootScope.$on('$cordovaLocalNotification:click', function(event, notification, state) {
        $state.go('menu.messages');
      });

    });
  };

});
