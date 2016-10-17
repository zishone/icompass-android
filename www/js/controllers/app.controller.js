angular.module('iComPAsS.controllers')

.controller('AppCtrl', function($scope, $window, $state, $ionicHistory, API, AuthService) {

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

  $scope.clearBackView = function() {
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
  };
});
