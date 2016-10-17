angular.module('iComPAsS.controllers')

.controller('DoctorDetailCtrl', function($scope, $stateParams, APIService, API){

  $scope.doctor_detail = {};

  APIService.get_doctor_detail($stateParams.doctorId).then(function(data) {

    $scope.doctor_detail.image = API.profile_pic_src + data.image + '.jpg';

    $scope.doctor_detail.fullname = data.fname + ' ' + data.mname + ' ' + data.lname;

    $scope.doctor_detail.info = [
      {
        'label': 'Specialty',
        'data': data.specialty
      },
      {
        'label': 'Clinic Hours',
        'data': data.available
      },
      {
        'label': 'Contact Number',
        'data': data.contactnumber
      }
    ];

  });
});
