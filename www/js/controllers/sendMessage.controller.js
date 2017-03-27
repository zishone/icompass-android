angular.module('iComPAsS.controllers')

.controller('SendMessageCtrl', function($scope, $state, $stateParams, MessagesService, UsersService){
  $scope.showLoading();

  UsersService.get_user_detail($stateParams.recipientId).then(function(data) {
    $scope.hideLoading();

    $scope.setRecipient(data);
  });

  $scope.setRecipient = function(data) {
    $scope.recipient = {
      'image': data.meta.profile_pic,
      'fullname': data.profile.fname + ' ' + data.profile.mname + ' ' + data.profile.lname
    };
  };

  $scope.messageData = {};

  $scope.sendMessage = function(){
    $scope.showLoading();

    MessagesService.send_message($stateParams.recipientId, $scope.messageData.message).then(function(){
      $scope.hideLoading();

      $scope.alertPopup('Success!', 'Sent!');

      $state.go('menu.select-recipient');
    }, function(err){
      $scope.hideLoading();

      $scope.alertPopup('Something Went Wrong!', 'Message not sent.');
    });
  };


});
