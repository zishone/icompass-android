angular.module('iComPAsS.services')

.factory('ChangePasswordService', function($http, API){
  // $http.defaults.cache = true;

  return {
    change_password: function(password) {
      var data = {
        'data': {
          'type': 'users',
          'attributes': {
            'current_password': password.current,
            'new_password': password.new
          }
        }
      };

      return $http.post(API.src + 'users/changepassword/', data)
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    }
  };
});
