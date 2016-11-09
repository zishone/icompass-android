angular.module('iComPAsS.controllers')

.controller('MessagesCtrl', function($scope, MessagesService, API){
  $scope.showLoading();

  MessagesService.get_received_messages().then(function(data) {
    $scope.hideLoading();

    $scope.received_messages = data.messages;
  });
});
