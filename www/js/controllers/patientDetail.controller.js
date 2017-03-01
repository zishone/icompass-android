angular.module('iComPAsS.controllers')

.controller('PatientDetailCtrl', function($scope, $stateParams, UsersService, EsasService){
  $scope.showLoading();

  $scope.patientId = $stateParams.patientId;

  $scope.populatePatientDetail = function(){
    $scope.patient_detail = {};

    UsersService.get_patient_detail($scope.patientId).then(function(data) {
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
            'data': moment(data.profile.bday).format("MMMM DD, YYYY")
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

      $scope.prescription = data.profile.prescript;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populatePatientDetail();
});
