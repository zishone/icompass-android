angular.module('iComPAsS.controllers')

.controller('MessageDetailCtrl', function($scope, $stateParams, MessagesService){
  $scope.showLoading();

  $scope.populateMessageDetail = function(){
    MessagesService.get_message($stateParams.messageId).then(function(data) {
      $scope.hideLoading();

      $scope.message = data;

      $scope.message.datesent = moment($scope.message.datesent).format("MMMM DD, YYYY");

      //set message status to seen
      MessagesService.seen_message($stateParams.messageId).then(function(){
        $scope.populateMenu();
      });

      $scope.populateMenu();
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateMessageDetail();
});
