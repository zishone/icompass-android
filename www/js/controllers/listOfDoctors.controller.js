angular.module('iComPAsS.controllers')

.controller('ListOfDoctorCtrl', function($scope, APIService, API){
  $scope.profile_pic_src = API.profile_pic_src;
  APIService.get_assigned_doctors().then(function(data) {
    $scope.assigned_doctors = data;
  });
});
