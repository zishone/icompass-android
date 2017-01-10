angular.module('iComPAsS.controllers')

.controller('ListOfDoctorsCtrl', function($scope, ListOfDoctorsService){
  $scope.showLoading();

  $scope.populateListOfDoctors = function(){
    ListOfDoctorsService.get_assigned_doctors().then(function(data) {
      $scope.hideLoading();

      $scope.assigned_doctors = data;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateListOfDoctors();
});
