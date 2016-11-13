angular.module('iComPAsS.controllers')

.controller('SendMessageCtrl', function($scope, $state, $ionicPopup, SendMessageService, ListOfDoctorsService, ListOfPatientsService, AuthService, USER_ROLES, API){
  $scope.showLoading();

  $scope.receivers = [];

  if(AuthService.role() === USER_ROLES.patient){
    ListOfDoctorsService.get_assigned_doctors().then(function(data) {
      $scope.hideLoading();

      $scope.id = "doc_id";

      $scope.receivers = data;
    });
  }else if(AuthService.role() === USER_ROLES.doctor){
    ListOfPatientsService.get_assigned_patients().then(function(data) {
      $scope.hideLoading();

      $scope.id = "p_id";

      $scope.receivers = data;
    });
  }

  $scope.messageData = {};

  $scope.sendMessage = function(){
    $scope.showLoading();

    SendMessageService.send_message($scope.messageData.receiver, $scope.messageData.message).then(function(){
      $scope.hideLoading();

      var alertPopup = $ionicPopup.alert({
        title: 'Success!',
        template: 'Sent!',
        cssClass: 'alert-popup'
      });

      $state.go('menu.messages');
    }, function(err){
      $scope.hideLoading();

      var alertPopup = $ionicPopup.alert({
        title: 'Something Went Wrong!',
        template: 'Message not sent.',
        cssClass: 'alert-popup'
      });
    });
  };


});
