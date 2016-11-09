angular.module('iComPAsS.controllers')

.controller('MessageDetailCtrl', function($scope, $stateParams, APIService, API){
  $scope.showLoading();

  APIService.get_message($stateParams.messageId).then(function(data) {
    $scope.hideLoading();

    $scope.message = data;
  });
});
