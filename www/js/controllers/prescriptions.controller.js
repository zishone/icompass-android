angular.module('iComPAsS.controllers')

.controller('PrescriptionsCtrl', function($scope, PrescriptionsService){
  $scope.showLoading();

  $scope.populatePrescriptions = function(){
    PrescriptionsService.get_patient_prescriptions().then(function(data) {
      $scope.hideLoading();

      $scope.prescriptions = data;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populatePrescriptions();
});
