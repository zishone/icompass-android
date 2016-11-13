angular.module('iComPAsS.controllers')

.controller('PatientDetailCtrl', function($scope, $stateParams, PatientDetailService){
  $scope.showLoading();

  $scope.populatePatientDetail = function(){
    $scope.patient_detail = {};

    PatientDetailService.get_patient_detail($stateParams.patientId).then(function(data) {
      $scope.hideLoading();

      $scope.patient_detail = {
        'image': data.meta.profile_pic,
        'fullname': data.profile.fname + ' ' + data.profile.mname + ' ' + data.profile.lname,
        'basic_info': [
          {
            'label': 'Username',
            'data': data.profile.username
          },
          {
            'label': 'Contact No.',
            'data': data.profile.contactnumber
          },
          {
            'label': 'E-mail',
            'data': data.profile.email
          },
          {
            'label': 'Birthday',
            'data': data.profile.bday
          },
          {
            'label': 'Age',
            'data': data.profile.age
          },
          {
            'label': 'Sex',
            'data': data.profile.gender === 'm'? 'Male' : 'Female'
          },
          {
            'label': 'Diagnosis',
            'data': data.profile.diagnosis
          },
          {
            'label': 'Allergies',
            'data': data.profile.allergies
          },
          {
            'label': 'Initial Height',
            'data': data.profile.height + ' cm'
          },
        ]
      };
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });

    PatientDetailService.get_doctor_prescriptions($stateParams.patientId).then(function(data) {
      $scope.hideLoading();

    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });

    PatientDetailService.get_esas_results($stateParams.patientId).then(function(data) {
      $scope.hideLoading();
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populatePatientDetail();
});
