angular.module('iComPAsS.controllers')

.controller('SentMessageDetailCtrl', function($scope, $stateParams, SentMessageDetailService){
  $scope.showLoading();

  $scope.populateSentMessageDetail = function(){
    SentMessageDetailService.get_message($stateParams.messageId).then(function(data) {
      $scope.hideLoading();

      $scope.message = data;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateSentMessageDetail();
});
