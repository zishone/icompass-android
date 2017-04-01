angular.module('iComPAsS.controllers')

.controller('PrescriptionsCtrl', function($scope, UsersService){
  $scope.showLoading();

  $scope.populatePrescriptions = function(){
    UsersService.get_patient_profile().then(function(data) {
      $scope.hideLoading();

      $scope.prescription = data.profile.prescript;
      console.log(data);
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populatePrescriptions();
});
