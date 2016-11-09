angular.module('iComPAsS.services')

.factory('MessageDetailService', function($http, API){
  // $http.defaults.cache = true;

  return {
    get_message: function(messageId) {
      return $http.get(API.src + 'messages/message/' + messageId)
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    }
  };
});
