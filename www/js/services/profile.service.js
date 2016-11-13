angular.module('iComPAsS.services')

.factory('ProfileService', function($http, AuthService, API){
  // $http.defaults.cache = true;

  return {
    get_user_profile: function() {
      return $http.get(API.src + 'users/profile/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_patient_profile: function() {
      return $http.get(API.src + 'patients/profile/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_doctor_profile: function() {
      return $http.get(API.src + 'doctors/profile/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    }
  };
});
