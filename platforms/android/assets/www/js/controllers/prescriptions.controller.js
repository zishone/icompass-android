angular.module('iComPAsS.controllers')

.controller('PrescriptionsCtrl', function($scope, ProfileService){
  $scope.showLoading();

  $scope.populatePrescriptions = function(){
    ProfileService.get_patient_profile().then(function(data) {
      $scope.hideLoading();

      $scope.prescription = data.profile.prescript;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populatePrescriptions();
});
