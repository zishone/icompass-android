angular.module('iComPAsS.services')

.factory('TakeEsasService', function($http, $q, API){
  // $http.defaults.cache = true;


  var pain_results = ['Pain', 'Tiredness', 'Nausea', 'Anxiety', 'Depression', 'Drowsiness', 'Lack of Appetite', 'Wellbeing', 'Shortness of Breath'];
  var pain_types = ['Sharp', 'Stabbing', 'Pricking', 'Burning', 'Boring', 'Splitting', 'Aching', 'Shooting', 'Throbbing', 'Crushing', 'Cutting', 'Cutting', 'Numbing', 'Tiring', 'Stretching/Tugging', 'Pressing'];

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
    submit_esas: submit_esas
  };
});
