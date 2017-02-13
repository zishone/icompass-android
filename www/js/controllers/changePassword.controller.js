angular.module('iComPAsS.controllers')

.controller('ChangePasswordCtrl', function($scope, PasswordService){
  $scope.password = {};

  $scope.doChangePassword = function() {

    if($scope.password.new === $scope.password.confirm_new){
      $scope.showLoading();

      PasswordService.change_password($scope.password).then(function(data) {
        $scope.hideLoading();

        $scope.alertPopup('Success!', 'You have changed your password.');

        $scope.password = {};

        $scope.goHome();
      }, function(err) {
        $scope.hideLoading();

        $scope.alertPopup('Something went wrong!', 'Please check your current password');
      });
    }else{
      $scope.alertPopup('Something went wrong!', 'New passwords did not match.');
    }
  };

});
