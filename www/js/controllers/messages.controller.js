angular.module('iComPAsS.controllers')

.controller('MessagesCtrl', function($scope, MessagesService, API){
  $scope.showLoading();

  $scope.populateMessages = function(){
    MessagesService.get_received_messages().then(function(data) {
      $scope.hideLoading();

      $scope.received_messages = data.messages;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateMessages();
});
