angular.module('iComPAsS.controllers')

.controller('MessageDetailCtrl', function($scope, $stateParams, APIService, API){
  APIService.get_message($stateParams.messageId).then(function(data) {
    $scope.message = data;
  });
});
