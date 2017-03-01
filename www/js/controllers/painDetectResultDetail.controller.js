angular.module('iComPAsS.controllers')

.controller('PainDetectResultDetailCtrl', function($scope, $stateParams, PainDetectService){
  $scope.showLoading();

  $scope.populatePainDetectResultDetail = function(){
    $scope.hideLoading();
  };

  $scope.populatePainDetectResultDetail();
});
