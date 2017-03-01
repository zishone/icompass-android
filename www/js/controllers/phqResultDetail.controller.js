angular.module('iComPAsS.controllers')

.controller('PhqResultDetailCtrl', function($scope, $stateParams, PhqService){
  $scope.showLoading();

  $scope.translations = PhqService.get_phq_translations();

  $scope.choices = [
    {
      text: $scope.translations.choice_1.en,
      value: 0
    },
    {
      text: $scope.translations.choice_2.en,
      value: 1
    },
    {
      text: $scope.translations.choice_3.en,
      value: 2
    },
    {
      text: $scope.translations.choice_4.en,
      value: 3
    }
  ];

  $scope.choices_a = [
    {
      text: $scope.translations.choice_1a.en,
      value: 0
    },
    {
      text: $scope.translations.choice_2a.en,
      value: 1
    },
    {
      text: $scope.translations.choice_3a.en,
      value: 2
    },{
      text: $scope.translations.choice_4a.en,
      value: 3
    }
  ];

  $scope.populatePhqResultDetail = function(){
    PhqService.get_phq_results($stateParams.patientId).then(function(data) {
      $scope.hideLoading();

      $scope.phq_result = data;
      for (var i = 0; i < $scope.phq_result.length; i++) {
        $scope.phq_result[i].dateanswered = moment($scope.phq_result[i].dateanswered).format("MMMM DD, YYYY");
      }
      for (var j = 0; j < $scope.phq_result.length; j++) {
        $scope.phq_result[j].phq_result = JSON.parse($scope.phq_result[j].phq_result);
      }
      $scope.phq_result.reverse();

      $scope.result_index = $stateParams.result_index;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populatePhqResultDetail();
});
