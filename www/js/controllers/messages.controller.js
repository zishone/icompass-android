angular.module('iComPAsS.controllers')

.controller('MessagesCtrl', function($scope, $ionicHistory, MessagesService){
  $scope.showLoading();

  console.log($ionicHistory.currentView());


  $scope.tab = 1;

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

  $scope.populateSentMessages = function(){
    MessagesService.get_sent_messages().then(function(data) {
      $scope.hideLoading();

      $scope.sent_messages = data.messages;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateSentMessages();

  $scope.populateEveryMessages = function(){
    $scope.populateMessages();
    $scope.populateSentMessages();
  };
});
