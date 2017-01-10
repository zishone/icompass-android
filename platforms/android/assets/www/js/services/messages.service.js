angular.module('iComPAsS.services')

.factory('MessagesService', function($http, API){
  // $http.defaults.cache = true;

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
    }
  };
});
