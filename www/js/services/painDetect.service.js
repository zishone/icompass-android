angular.module('iComPAsS.services')

.factory('PainDetectService', function($http, $q, API){
  var translations = {};

  var submit_pain_detect = function(pain_detect_result){
    return $q(function(resolve, reject) {
      var data = pain_detect_result;
      $http.post(API.src + 'paindetect', data)
      .then(function successCallback(response) {
        resolve('Submission Success.');
      }, function errorCallback(response) {
        reject('Submission Failed.');
      });
    });
  };

  return {
    submit_pain_detect: submit_pain_detect,
    get_pain_detect_translations: function() {
      return translations;
    }
  };
});
