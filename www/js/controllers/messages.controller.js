angular.module('iComPAsS.controllers')

.controller('MessagesCtrl', function($scope, $interval, MessagesService, APP_CONST){
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

  // $interval(function() {
  //   $scope.populateEveryMessages();
  // }, APP_CONST.sync_interval);
});
