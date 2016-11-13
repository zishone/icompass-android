angular.module('iComPAsS.services')

.factory('SentMessagesService', function($http, API){
  // $http.defaults.cache = true;

  return {
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
