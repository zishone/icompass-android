angular.module('iComPAsS.controllers')

.controller('PrescriptionsCtrl', function($scope, APIService){
  $scope.showLoading();

  APIService.get_patient_prescriptions().then(function(data) {
    $scope.hideLoading();

    $scope.prescriptions = data;
  });
});
