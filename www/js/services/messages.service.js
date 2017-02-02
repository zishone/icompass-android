angular.module('iComPAsS.services')

.factory('MessagesService', function($http, API){
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
      $http.post(API.src + 'messages', data)
      .then(function successCallback(response) {
        resolve('Sending Success.');
      }, function errorCallback(response) {
        reject('Sending Failed.');
      });
    });
  };

  return {
    get_received_messages: function() {
      return $http.get(API.src + 'messages/received/?page_limit=99999')
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_sent_messages: function() {
      return $http.get(API.src + 'messages/sent')
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_message: function(messageId) {
      return $http.get(API.src + 'messages/message/' + messageId)
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    seen_message: function(messageId) {
      return $http.put(API.src + 'messages/' + messageId + '/seen')
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    send_message: send_message
  };
});
