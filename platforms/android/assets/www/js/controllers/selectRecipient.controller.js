angular.module('iComPAsS.controllers')

.controller('SelectRecipientCtrl', function($scope, $state, ListOfPatientsService, ListOfDoctorsService){
  $scope.showLoading();

  $scope.populateListOfPatients = function(){
    ListOfPatientsService.get_assigned_patients().then(function(data) {
      $scope.hideLoading();

      $scope.assigned_patients = data;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateListOfPatients();

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

  $scope.populateRecipients = function() {
    $scope.populateListOfPatients();
    $scope.populateListOfDoctors();
  }

});
