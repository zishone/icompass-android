angular.module('iComPAsS.services')

.factory('ForgotPasswordService', function($http, API){
  // $http.defaults.cache = true;

  return {
    request_reset_key: function(username) {
      var data = {
        'username': username
      };

      return $http.post(API.src + 'users/requestresetpassword/', data)
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response);
      });
    }
  };
});
