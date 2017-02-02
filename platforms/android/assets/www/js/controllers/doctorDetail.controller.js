angular.module('iComPAsS.controllers')

.controller('DoctorDetailCtrl', function($scope, $stateParams, UsersService){
  $scope.showLoading();

  $scope.populateDoctorDetail = function() {
    $scope.doctor_detail = {};

    UsersService.get_doctor_detail($stateParams.doctorId).then(function(data) {
      $scope.hideLoading();

      $scope.doctor_detail.image = data.meta.profile_pic;

      $scope.doctor_detail.fullname = data.profile.fname + ' ' + data.profile.mname + ' ' + data.profile.lname;

      $scope.doctor_detail.info = [
        {
          'label': 'Specialty',
          'data': data.profile.specialty
        },
        {
          'label': 'Clinic Hours',
          'data': data.profile.available
        },
        {
          'label': 'Contact Number',
          'data': data.profile.contactnumber
        }
      ];

    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateDoctorDetail();

});
