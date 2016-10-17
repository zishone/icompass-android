angular.module('iComPAsS.controllers')

.controller('InboxCtrl', function($scope, APIService, API){
  APIService.get_received_messages().then(function(data) {
    $scope.received_messages = data.messages;
  });
});
