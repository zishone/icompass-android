angular.module('iComPAsS.controllers')

.controller('AppCtrl', function($scope, $window, $state, $ionicHistory, $ionicLoading, API, AuthService) {

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
});
