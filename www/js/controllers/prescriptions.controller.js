angular.module('iComPAsS.controllers')

.controller('PrescriptionsCtrl', function($scope, APIService){
  APIService.get_patient_prescriptions().then(function(data) {
    $scope.prescriptions = data;
  });
});
