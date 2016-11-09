angular.module('iComPAsS.controllers')

.controller('ListOfDoctorsCtrl', function($scope, ListOfDoctorsService, API){
  $scope.showLoading();

  $scope.profile_pic_src = API.profile_pic_src;
  ListOfDoctorsService.get_assigned_doctors().then(function(data) {
    $scope.hideLoading();

    $scope.assigned_doctors = data;
  });
});
