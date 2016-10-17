angular.module('iComPAsS.controllers')

.controller('ProfileCtrl', function($scope, AuthService, USER_ROLES, APIService){
  $scope.resetTabs();

  $scope.user_profile = {};

  if(AuthService.role() === USER_ROLES.patient){
    APIService.get_patient_profile().then(function(data) {

      $scope.user_profile = $scope.getBasicInfo(data);

      // Parse JSON form data.weights
      var weights = [];
      for (var i = 0; i < data.weights.length; i++) {
        weights.push(JSON.parse(data.weights[i]));
      }

      $scope.user_profile.more = $scope.getPatientMore(data, weights);
    });
  }else if(AuthService.role() === USER_ROLES.doctor){
    APIService.get_doctor_profile().then(function(data) {

      $scope.user_profile = $scope.getBasicInfo(data);

      $scope.user_profile.more = $scope.getDoctorMore(data);
    });
  }
});
