angular.module('iComPAsS.services')

.factory('SendMessageService', function($http, $q, API){
  // $http.defaults.cache = true;

  var send_message = function(receiver, message){
    return $q(function(resolve, reject) {
      var data = {
        'data': {
          'type': 'messages',
          'attributes': {
            'receiver': parseInt(receiver),
            'message': message
          }
        }
      };
      console.log(data);
      $http.post(API.src + 'messages', data)
      .then(function successCallback(response) {
        resolve('Sending success.');
      }, function errorCallback(response) {
        reject('Sending Failed.');
      });
    });
  };

  return {
    send_message: send_message
  };
});
