angular.module('iComPAsS.services')

.factory('PatientDetailService', function($http, API){
  // $http.defaults.cache = true;

  return {
    get_patient_detail: function(patientId) {
      return $http.get(API.src + 'patients/profile/' + patientId)
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_doctor_prescriptions: function(patientId) {
      return $http.get(API.src + 'doctors/prescriptions/')
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_esas_results: function(patientId) {
      return $http.get(API.src + 'patients/esas/results/' + patientId)
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    }
  };
});
