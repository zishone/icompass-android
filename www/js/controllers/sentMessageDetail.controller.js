angular.module('iComPAsS.controllers')

.controller('SentMessageDetailCtrl', function($scope, $stateParams, MessagesService){
  $scope.showLoading();

  $scope.populateMessageDetail = function(){
    MessagesService.get_message($stateParams.messageId).then(function(data) {
      $scope.hideLoading();

      $scope.message = data;

      $scope.populateMenu();
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateMessageDetail();
});
