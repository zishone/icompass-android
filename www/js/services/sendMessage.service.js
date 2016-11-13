angular.module('iComPAsS.services')

.factory('SendMessageService', function($http, $q, API){
  // $http.defaults.cache = true;

  var send_message = function(receiver, message){
    return $q(function(resolve, reject) {
      var data = {
        'data': {
          'type': 'messages',
          'attributes': {
            'receiver': receiver,
            'message': message
          }
        }
      };

      $http.post(API.src + 'doctors/messages', data)
      .then(function successCallback(response) {
        resolve('Login success.');
      }, function errorCallback(response) {
        reject('Login Failed.');
      });
    });
  };

  return {
    send_message: send_message
  };
});
