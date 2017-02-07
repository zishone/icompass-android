angular.module('iComPAsS.services')

.factory('PhqService', function($http, $q, API){
  // $http.defaults.cache = true;

  var submit_phq = function(phq_result){
    return $q(function(resolve, reject) {
      var data = phq_result;
      $http.post(API.src + 'phq', data)
      .then(function successCallback(response) {
        resolve('Submission Success.');
      }, function errorCallback(response) {
        reject('Submission Failed.');
      });
    });
  };

  return {
    submit_phq: submit_phq
  };
});
