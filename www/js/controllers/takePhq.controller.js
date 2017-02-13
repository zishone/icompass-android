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
      readOnly: true,
      showSelectionBar: true,
      getSelectionBarColor: function(value) {
        return 'blue';
      }
    }
  };

  $scope.translations = PhqService.get_phq_translations();

  $scope.setChoices = function(){
    $scope.choices = [
      {
        text: $scope.translations.choice_1[$scope.language],
        value: 0
      },
      {
        text: $scope.translations.choice_2[$scope.language],
        value: 1
      },
      {
        text: $scope.translations.choice_3[$scope.language],
        value: 2
      },{
        text: $scope.translations.choice_4[$scope.language],
        value: 3
      }
    ];
  };

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
