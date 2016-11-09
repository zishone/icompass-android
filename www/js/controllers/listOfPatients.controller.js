angular.module('iComPAsS.controllers')

.controller('ListOfPatientsCtrl', function($scope, API, APIService){
  $scope.showLoading();

  $scope.profile_pic_src = API.profile_pic_src;
  APIService.get_assigned_patients().then(function(data) {
    $scope.hideLoading();

    $scope.assigned_patients = data;
  });
});
