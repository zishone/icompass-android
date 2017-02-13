angular.module('iComPAsS.services')

.factory('EsasService', function($http, $q, API){
  // $http.defaults.cache = true;

  var translations = {
    "pain": {
      "en": "Pain",
      "tl": "Sakit"
    },
    "nausea": {
      "en": "Nausea",
      "tl": "Pagkahilo"
    },
    "anxiety": {
      "en": "Anxiety",
      "tl": "Pagkabalisa"
    },
    "depression": {
      "en": "Depression",
      "tl": "Depresyon"
    },
    "lack_of_appetite": {
      "en": "Lack of Appetite",
      "tl": "Walang gana (sa pagkain)"
    },
    "wellbeing": {
      "en": "Wellbeing",
      "tl": "Kabutihan"
    },
    "shortness_of_breath": {
      "en": "Shortness of Breath",
      "tl": "Igsi ng hininga"
    },
    "other_symptoms": {
      "en": "Other Symptoms",
      "tl": "Iba pang sintomas"
    },
    "paint_types_most_painful": {
      "en": "Pain Types",
      "tl": "Uri ng Sakit"
    },
    "sharp": {
      "en": "Sharp",
      "tl": "Matalim"
    },
    "stabbing": {
      "en": "Stabbing",
      "tl": "Sumasaksak"
    },
    "pricking": {
      "en": "Pricking",
      "tl": "Pagsundot"
    },
    "burning": {
      "en": "Burning",
      "tl": "Umaalab"
    },
    "boring": {
      "en": "Boring",
      "tl": "Pagbubutas"
    },
    "splitting": {
      "en": "Splitting",
      "tl": "Pagbibiak"
    },
    "aching": {
      "en": "Aching",
      "tl": "Kumikirot"
    },
    "shooting": {
      "en": "Shooting",
      "tl": "Pagbabaril"
    },
    "throbbing": {
      "en": "Throbbing",
      "tl": "Tumitibok"
    },
    "crushing": {
      "en": "Crushing",
      "tl": "Nadudurog"
    },
    "cutting": {
      "en": "Cutting",
      "tl": "Nahihiwa"
    },
    "numbing": {
      "en": "Numbing",
      "tl": "Namamanhid"
    },
    "tiring": {
      "en": "Tiring",
      "tl": "Napapagod"
    },
    "stretching": {
      "en": "Stretching/Tugging",
      "tl": "Nahahatak"
    },
    "pressing": {
      "en": "Pressing",
      "tl": "Parang Nadidiin"
    },
    "symptoms_question": {
      "en": "Do You Feel Any Symptoms?",
      "tl": "Nakakaramdam ka ba ng kahit anong sintomas?"
    },
    "drowsiness": {
      "en": "Drowsiness",
      "tl": "Antukin"
    },
    "yes": {
      "en": "Yes",
      "tl": "Oo"
    },
    "no": {
      "en": "No",
      "tl": "Hindi"
    },
    "enter": {
      "en": "Enter symptom:",
      "tl": "Magpasok ng sintomas:"
    },
    "review": {
      "en": "Review",
      "tl": "Suriin"
    },
    "submit": {
      "en": "Submit",
      "tl": "i-Sumite"
    },
    "tiredness": {
      "en": "Tiredness",
      "tl": "Kapaguran"
    },
    "add_symptom": {
      "en": "Add Symptom",
      "tl": "Dagdagan"
    },
    "remove_symptom": {
      "en": "Remove Symptom",
      "tl": "Bawasan"
    },
    "right": {
      "en": "Right",
      "tl": "Kanan"
    },
    "left": {
      "en": "Left",
      "tl": "Kaliwa"
    },
    "scale": {
      "en": "On a scale of 0 to 10 how do you feel NOW?",
      "tl": "Sa isang scale of 0 hanggang 10 gaano mo pakiramdam NGAYON?"
    },
    "drag": {
      "en": "Drag the pointer to move left and right the scale",
      "tl": "I-drag ang pointer upang ilipat sa kaliwa at kanang mga scale"
    },
    "tap_next": {
      "en": "Tap the Next arrow when you're finished.",
      "tl": "I-tap ang Susunod arrow kapag tapos ka na."
    },
    "tap_body": {
      "en": "Tap on the part of your body where you feel pain",
      "tl": "Tapikin ang bahagi ng iyong katawan na kung saan sa tingin mo masakit"
    },
    "tap_once": {
      "en": "Tap <b>once</b> for Mild Pain",
      "tl": "Tapikin <b>isang beses</b> para sa Mild Pain"
    },
    "tap_twice": {
      "en": "Tap <b>twice</b> for Moderate Pain",
      "tl": "Tapikin <b>dalawang beses</b> para sa Moderate Pain"
    },
    "tap_thrice": {
      "en": "Tap <b>thrice</b> for Severe Pain",
      "tl": "Tapikin <b>tatlong beses</b> para sa Matinding Sakit"
    },
    "tap_four": {
      "en": "Tap <b>four times</b> to reset",
      "tl": "Tapikin <b>apat na beses</b> upang i-reset"
    },
  };

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
      return translations;
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
