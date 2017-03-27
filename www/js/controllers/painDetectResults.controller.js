angular.module('iComPAsS.controllers')

.controller('PainDetectResultsCtrl', function($scope, $stateParams, PainDetectService){
  $scope.showLoading();

  $scope.patientId = $stateParams.patientId;

  $scope.populatePainDetectResults = function() {
    PainDetectService.get_pain_detect_results($scope.patientId).then(function(data) {
      $scope.hideLoading();

      $scope.pain_detect_results = data;
      for (var j = 0; j < $scope.pain_detect_results.length; j++) {
        $scope.pain_detect_results[j].dateanswered = moment($scope.pain_detect_results[j].dateanswered).format("MMMM DD, YYYY");
      }
      $scope.pain_detect_results_reversed = $scope.pain_detect_results.slice(0);
      $scope.pain_detect_results_reversed.reverse();
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populatePainDetectResults();
});
