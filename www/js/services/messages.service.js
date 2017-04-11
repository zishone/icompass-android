angular.module('iComPAsS.services')

.factory('MessagesService', function($http, $q, API){
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
      $http.post(API.src + API.messages, data)
      .then(function successCallback(response) {
        resolve('Sending Success.');
      }, function errorCallback(response) {
        reject('Sending Failed.');
      });
    });
  };

  return {
    get_received_messages: function() {
      return $http.get(API.src + API.messages_received + '?page_limit=99999')
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_sent_messages: function() {
      return $http.get(API.src + API.messages_sent)
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_message: function(messageId) {
      return $http.get(API.src + API.messages_message + messageId)
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    seen_message: function(messageId) {
      return $http.put(API.src + API.messages + messageId + '/' + API.seen)
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_recipients: function() {
      return $http.get(API.src + API.messages_recipients)
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    send_message: send_message
  };
});
