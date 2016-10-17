angular.module('iComPAsS.controllers')

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService, USER_ROLES) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    AuthService.login($scope.loginData.username, $scope.loginData.password).then(function(authenticated) {
      // Prevent admin account from logging in
      if(AuthService.role() === USER_ROLES.admin){
        //destroy user credential becuase login was not really made
        AuthService.logout();
        var alertPopup = $ionicPopup.alert({
          title: 'Sorry!',
          template: 'Android verion of iComPAsS is not available to this type of user.',
          cssClass: 'alert-popup'
        });
      }else{
        //redirect to profile
        $state.go('menu.profile', {}, {reload: true}).then(function(){
          $scope.clearBackView();
        });
      }

      // Clear loginData
      $scope.loginData = {};
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!',
        cssClass: 'alert-popup'
      });

      // Clear loginData
      $scope.loginData = {};
    });
  };
});
