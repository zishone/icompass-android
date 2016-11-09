angular.module('iComPAsS.services')

.factory('ListOfPatientsAPIService', function($http, AuthService, API){
  // $http.defaults.cache = true;

  return {
    get_assigned_patients: function() {
      return $http.get(API.src + 'doctors/assigned_patients/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    }
  };
});
