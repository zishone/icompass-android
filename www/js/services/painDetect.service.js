angular.module('iComPAsS.services')

.factory('PainDetectService', function($http, $q, API){
  var translations = {
    "tap_body": {
      "en": "Tap on the part of your body where you feel pain",
      "tl": "Tapikin ang bahagi ng iyong katawan na kung saan sa tingin mo masakit"
    },
    "tap_once": {
      "en": "Tap <b>once</b> for the Main Pain",
      "tl": "Tapikin <b>isang beses</b> para sa Main Pain"
    },
    "tap_twice": {
      "en": "Tap <b>twice</b> for Radiating Pain",
      "tl": "Tapikin <b>dalawang beses</b> para sa Radiating Pain"
    },
    "tap_thrice": {
      "en": "Tap <b>three times</b> to reset",
      "tl": "Tapikin <b>tatlong na beses</b> upang i-reset"
    },
  };

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
