angular.module('iComPAsS.controllers')

.controller('PrescriptionsCtrl', function($scope, PrescriptionsService){
  $scope.showLoading();

  PrescriptionsService.get_patient_prescriptions().then(function(data) {
    $scope.hideLoading();

    $scope.prescriptions = data;
  });
});
