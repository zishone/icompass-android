angular.module('iComPAsS.controllers')

.controller('PhqResultsCtrl', function($scope, $stateParams, PhqService){
  $scope.showLoading();

  $scope.patientId = $stateParams.patientId;

  $scope.populatePhqResults = function() {
    PhqService.get_phq_results($scope.patientId).then(function(data) {
      $scope.hideLoading();

      $scope.phq_results = data;
      for (var j = 0; j < $scope.phq_results.length; j++) {
        $scope.phq_results[j].dateanswered = moment($scope.phq_results[j].dateanswered).format("MMMM DD, YYYY");
      }
      $scope.phq_results_reversed = $scope.phq_results.slice(0);
      // $scope.phq_results_reversed.reverse();
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populatePhqResults();
});
