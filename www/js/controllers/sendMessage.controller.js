angular.module('iComPAsS.controllers')

.controller('SendMessageCtrl', function($scope, SendMessageService, ListOfDoctorsService, AuthService, USER_ROLES, API){
  $scope.showLoading();

  $scope.receivers = [];

  if(AuthService.role() === USER_ROLES.patient){
    ListOfDoctorsService.get_assigned_doctors().then(function(data) {
      $scope.hideLoading();

      for(var i = 0; i < data.length; i++){
        $scope.receivers.push({
          'id': data[i].doc_id,
          'name': data[i].fullname
        });
      }
    });
  }else if(AuthService.role() === USER_ROLES.doctor){
    ListOfPatientsService.get_assigned_patients().then(function(data) {
      $scope.hideLoading();

      for(var i = 0; i < data.length; i++){
        $scope.receivers.push({
          'id': data[i].p_id,
          'name': data[i].fullname
        });
      }
    });
  }

  $scope.sendMessage = function(){
    $scope.showLoading();

    SendMessageService.send_message($scope.messageData.receiver, $scope.messageData.message).then(function(){
      $scope.hideLoading();

      var alertPopup = $ionicPopup.alert({
        template: 'Sent!',
        cssClass: 'alert-popup'
      });
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
