angular.module('iComPAsS.controllers')

.controller('ListOfPatientsCtrl', function($scope, UsersService){
  $scope.showLoading();

  $scope.populateListOfPatients = function(){
    UsersService.get_assigned_patients().then(function(data) {
      $scope.hideLoading();

      $scope.assigned_patients = data;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateListOfPatients();
});
