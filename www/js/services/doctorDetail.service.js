angular.module('iComPAsS.services')

.factory('DoctorDetailService', function($http, API){
  // $http.defaults.cache = true;

  return {
    get_doctor_detail: function(doctorId) {
      return $http.get(API.src + 'doctors/profile/' + doctorId)
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    }
  };
});
