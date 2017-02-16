angular.module('iComPAsS.controllers')

.controller('SelectRecipientCtrl', function($scope, $state, MessagesService){
  $scope.showLoading();

  $scope.populateRecipients = function(){
    MessagesService.get_recipients().then(function(data) {
      $scope.hideLoading();

      $scope.recipients = data;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };


  $scope.populateRecipients();
});
