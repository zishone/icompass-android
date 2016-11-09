angular.module('iComPAsS.controllers')

.controller('MessagesCtrl', function($scope, APIService, API){
  $scope.showLoading();

  APIService.get_received_messages().then(function(data) {
    $scope.hideLoading();

    $scope.received_messages = data.messages;
  });
});
