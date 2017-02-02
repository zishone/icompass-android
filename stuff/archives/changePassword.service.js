angular.module('iComPAsS.services')

.factory('ChangePasswordService', function($http, $q, API){
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

  return {
    change_password: change_password
  };
});
