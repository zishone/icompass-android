angular.module('iComPAsS.controllers')

.controller('PatientDetailCtrl', function($scope, $stateParams, APIService, API){
  $scope.showLoading();

  $scope.patient_detail = {};

  APIService.get_patient_detail($stateParams.patientId).then(function(data) {
    $scope.hideLoading();

    $scope.patient_detail = {
      'image': API.profile_pic_src + data.image + '.jpg',
      'fullname': data.fname + ' ' + data.mname + ' ' + data.lname,
      'basic_info': [
        {
          'label': 'Username',
          'data': data.username
        },
        {
          'label': 'Contact No.',
          'data': data.contactnumber
        },
        {
          'label': 'E-mail',
          'data': data.email
        },
        {
          'label': 'Birthday',
          'data': data.bday
        },
        {
          'label': 'Age',
          'data': data.age
        },
        {
          'label': 'Sex',
          'data': data.gender === 'm'? 'Male' : 'Female'
        },
        {
          'label': 'Diagnosis',
          'data': data.diagnosis
        },
        {
          'label': 'Allergies',
          'data': data.allergies
        },
        {
          'label': 'Initial Height',
          'data': data.height + ' cm'
        },
      ]
    };
  });

  APIService.get_doctor_prescriptions($stateParams.patientId).then(function(data) {
    $scope.hideLoading();

  });

  APIService.get_esas_results($stateParams.patientId).then(function(data) {
    $scope.hideLoading();
  });
});
