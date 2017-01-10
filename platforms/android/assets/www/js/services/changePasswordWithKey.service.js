angular.module('iComPAsS.services')

.factory('ChangePasswordWithKeyService', function($http, $q, API){
  // $http.defaults.cache = true;

  var change_password = function(password){
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
    change_password: change_password
  };
});
