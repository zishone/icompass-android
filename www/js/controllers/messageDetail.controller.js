angular.module('iComPAsS.controllers')

.controller('MessageDetailCtrl', function($scope, $stateParams, MessageDetailService, API){
  $scope.showLoading();

  MessageDetailService.get_message($stateParams.messageId).then(function(data) {
    $scope.hideLoading();

    $scope.message = data;
  });
});
