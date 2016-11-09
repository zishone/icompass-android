angular.module('iComPAsS.controllers')

.controller('ListOfPatientsCtrl', function($scope, ListOfPatientsService, API){
  $scope.showLoading();

  $scope.profile_pic_src = API.profile_pic_src;
  ListOfPatientsService.get_assigned_patients().then(function(data) {
    $scope.hideLoading();

    $scope.assigned_patients = data;
  });
});
