angular.module('iComPAsS.services')

.factory('ListOfDoctorsService', function($http, AuthService, API){
  // $http.defaults.cache = true;

  return {
    get_assigned_doctors: function() {
      return $http.get(API.src + 'patients/assigned_doctors/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    }
  };
});
