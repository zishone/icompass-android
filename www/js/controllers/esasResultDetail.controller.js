angular.module('iComPAsS.controllers')

.controller('EsasResultDetailCtrl', function($scope, $stateParams, EsasService){
  $scope.showLoading();

  $scope.populateEsasResultDetail = function(){
    $scope.pain_types = EsasService.get_pain_types();

    EsasService.get_esas_results($stateParams.patientId).then(function(data) {
      $scope.hideLoading();

      $scope.esas_result = data;
      for (var i = 0; i < $scope.esas_result.length; i++) {
        $scope.esas_result[i].dateanswered = moment($scope.esas_result[i].dateanswered).format("MMMM DD, YYYY");
      }

      for (var j = 0; j < $scope.esas_result.length; j++) {
        $scope.esas_result[j].diagram = JSON.parse($scope.esas_result[j].diagram);
        $scope.esas_result[j].pain_result = JSON.parse($scope.esas_result[j].pain_result);
        $scope.esas_result[j].pain_type = JSON.parse($scope.esas_result[j].pain_type);
      }

      $scope.esas_result.reverse();
      $scope.result_index = $stateParams.result_index;

      //set diagram colors
      for (var anterior in $scope.esas_result[$scope.result_index].diagram[0].anterior) {
        $scope.setColor(anterior, $scope.esas_result[$scope.result_index].diagram[0].anterior[anterior]);
      }

      for (var posterior in $scope.esas_result[$scope.result_index].diagram[1].posterior) {
        $scope.setColor(posterior, $scope.esas_result[$scope.result_index].diagram[1].posterior[posterior]);
      }
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateEsasResultDetail();
});
