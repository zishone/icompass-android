angular.module('iComPAsS.controllers')

.controller('ListOfDoctorsCtrl', function($scope, APIService, API){
  $scope.showLoading();

  $scope.profile_pic_src = API.profile_pic_src;
  APIService.get_assigned_doctors().then(function(data) {
    $scope.hideLoading();
    
    $scope.assigned_doctors = data;
  });
});
