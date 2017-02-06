angular.module('iComPAsS.services')

.factory('EsasService', function($http, $q, API){
  // $http.defaults.cache = true;


  var pain_results = ['Pain', 'Tiredness', 'Nausea', 'Anxiety', 'Depression', 'Drowsiness', 'Lack of Appetite', 'Wellbeing', 'Shortness of Breath'];
  var pain_types = ['Sharp', 'Stabbing', 'Pricking', 'Burning', 'Boring', 'Splitting', 'Aching', 'Shooting', 'Throbbing', 'Crushing', 'Cutting', 'Numbing', 'Tiring', 'Stretching/Tugging', 'Pressing'];

  var submit_esas = function(esas_result){
    return $q(function(resolve, reject) {
      var data = esas_result;
      $http.post(API.src + 'esas/submit', data)
      .then(function successCallback(response) {
        resolve('Submission Success.');
      }, function errorCallback(response) {
        reject('Submission Failed.');
      });
    });
  };

  return {
    get_pain_results: function(){
      return pain_results;
    },
    get_pain_types: function() {
      return pain_types;
    },
    submit_esas: submit_esas,
    get_esas_translations: function() {
      return $http.get(API.src + '/esas/translations')
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
