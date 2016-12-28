angular.module('iComPAsS.controllers')

.controller('ChangePasswordCtrl', function($scope, ChangePasswordService){
  $scope.password = {};

  $scope.doChangePassword = function() {
    $scope.showLoading();

    if($scope.password.new === $scope.password.confirm_new){
      ChangePasswordService.change_password($scope.password).then(function(data) {
        $scope.hideLoading();
        console.log(data);
        $scope.alertPopup('Success!', 'You have changed your password.');
      }, function(err) {
        $scope.hideLoading();

        $scope.alertPopup('Something went wrong!', 'Please check your current password');
      });
    }else{
      $scope.alertPopup('Something went wrong!', 'New passwords did not match.');
    }
  };

});
