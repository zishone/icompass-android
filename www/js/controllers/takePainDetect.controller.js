angular.module('iComPAsS.controllers')

.controller('TakePainDetectCtrl', function($scope, $state, UsersService, PainDetectService){
  $scope.pain_detect_enabled = 1;


  $scope.progress = {
    options: {
      floor: 1,
      ceil: 11,
      showTicks: true,
      hidePointerLabels: true,
      hideLimitLabels: true,
      readOnly: true,
      showSelectionBar: true,
      getSelectionBarColor: function(value) {
        return 'blue';
      }
    }
  };

  $scope.submitPainDetect = function() {
    $scope.showLoading();

    PainDetectService.submit_pain_detect($scope.pain_detect_result).then(function(data) {
      $scope.hideLoading();

      $scope.alertPopup('Success!', 'Have a great day!');

      $scope.goHome();
    }, function(err) {
      $scope.hideLoading();

      $scope.alertPopup('Submission Failed!', 'Please try again!');
    });
  };
});
