angular.module('iComPAsS.services')

.factory('PasswordService', function($http, $q, API){
  // $http.defaults.cache = true;

  var change_password = function(password){
    return $q(function(resolve, reject) {
      var data = {
        'data': {
          'type': 'users',
          'attributes': {
            'current_password': password.current,
            'new_password': password.new
          }
        }
      };
      $http.post(API.src + 'users/changepassword/', data)
      .then(function successCallback(response) {
        resolve('Change Password success.');
      }, function errorCallback(response) {
        reject('Change Password Failed.');
      });
    });
  };

  var change_password_with_key = function(password){
    return $q(function(resolve, reject) {
      var data = {
        'secret_key': password.key,
        'new_password': password.new
      };
      $http.post(API.src + 'users/resetpassword/', data)
      .then(function successCallback(response) {
        resolve('Change Password success.');
      }, function errorCallback(response) {
        reject('Change Password Failed.');
      });
    });
  };

  return {
    change_password: change_password,
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
    },
    change_password_with_key: change_password_with_key
  };
});
