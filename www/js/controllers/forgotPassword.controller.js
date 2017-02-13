angular.module('iComPAsS.controllers')

.controller('ForgotPasswordCtrl', function($scope, $state, PasswordService){
  $scope.requestSecretKey = function() {
    $scope.showLoading();

    PasswordService.request_reset_key($scope.username).then(function(data) {
      $scope.hideLoading();
      $state.go('change-password-with-key');
    }, function(err){
      $scope.hideLoading();
      $scope.alertPopup('Fail!', 'Something went wrong.');
    });
  };
});
