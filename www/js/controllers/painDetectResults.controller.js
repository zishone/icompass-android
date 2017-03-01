angular.module('iComPAsS.controllers')

.controller('PainDetectResultsCtrl', function($scope, $stateParams, PainDetectService){
  $scope.showLoading();

  $scope.patientId = $stateParams.patientId;

  $scope.populatePainDetectResults = function() {
    $scope.hideLoading();
  };

  $scope.populatePainDetectResults();
});
