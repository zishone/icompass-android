angular.module('iComPAsS.controllers')

.controller('SentMessagesCtrl', function($scope, AuthService, SentMessagesService){
  $scope.showLoading();

  $scope.populateSentMessages = function(){
    SentMessagesService.get_sent_messages().then(function(data) {
      $scope.hideLoading();

      $scope.sent_messages = data.messages;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateSentMessages();
});
