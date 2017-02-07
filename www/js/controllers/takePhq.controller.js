angular.module('iComPAsS.controllers')

.controller('TakePhqCtrl', function($scope, $state, UsersService, PhqService){
  // $scope.showLoading();
  $scope.phq_enabled = 1;

  $scope.phq_result = {};

  $scope.progress = {
    options: {
      floor: 1,
      ceil: 11,
      showTicks: true,
      hidePointerLabels: true,
      hideLimitLabels: true,
      readOnly: true
    }
  };

  $scope.choices = [
    {
      text: "Not at all",
      value: 0
    },
    {
      text: "Several days",
      value: 1
    },
    {
      text: "More than half the days",
      value: 2
    },{
      text: "Nearly every day",
      value: 3
    }
  ];

  $scope.submitPhq = function() {
    $scope.showLoading();

    PhqService.submit_phq($scope.phq_result).then(function(data) {
      $scope.hideLoading();

      $scope.alertPopup('Success!', 'Have a great day!');

      $scope.goHome();
    }, function(err) {
      $scope.hideLoading();

      $scope.alertPopup('Submission Failed!', 'Please try again!');
    });
  };
});
