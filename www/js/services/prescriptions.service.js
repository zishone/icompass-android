angular.module('iComPAsS.services')

.factory('PrescriptionsService', function($http, AuthService, API){
  // $http.defaults.cache = true;

  return {
    get_patient_prescriptions: function() {
      return $http.get(API.src + 'patients/prescriptions/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    }
  };
});
