angular.module('iComPAsS.services')

.factory('EsasService', function($http, $q, API){
  // $http.defaults.cache = true;

  // var translations = {
  //   "pain": {
  //     "en": "Pain",
  //     "tl": "Pananakit"
  //   },
  //   "nausea": {
  //     "en": "Nausea",
  //     "tl": "Pagkahilo/Pagkalula"
  //   },
  //   "anxiety": {
  //     "en": "Anxiety",
  //     "tl": "Pagkabalisa"
  //   },
  //   "depression": {
  //     "en": "Depression",
  //     "tl": "Depresyon"
  //   },
  //   "lack_of_appetite": {
  //     "en": "Lack of Appetite",
  //     "tl": "Walang ganang kumain"
  //   },
  //   "wellbeing": {
  //     "en": "Wellbeing",
  //     "tl": "Kalusugan"
  //   },
  //   "shortness_of_breath": {
  //     "en": "Shortness of Breath",
  //     "tl": "Kakapusan sa Paghinga"
  //   },
  //   "other_symptoms": {
  //     "en": "Other Symptoms",
  //     "tl": "Iba pang sintomas"
  //   },
  //   "paint_types_most_painful": {
  //     "en": "Pain Types",
  //     "tl": "Uri ng Sakit"
  //   },
  //   "sharp": {
  //     "en": "Sharp",
  //     "tl": "Parang Matalas"
  //   },
  //   "stabbing": {
  //     "en": "Stabbing",
  //     "tl": "Parang sinasaksak"
  //   },
  //   "pricking": {
  //     "en": "Pricking",
  //     "tl": "Parang tinutusok"
  //   },
  //   "burning": {
  //     "en": "Burning",
  //     "tl": "Nakakapaso"
  //   },
  //   "boring": {
  //     "en": "Boring",
  //     "tl": "Parang binubutas"
  //   },
  //   "splitting": {
  //     "en": "Splitting",
  //     "tl": "Parang binibiyak"
  //   },
  //   "aching": {
  //     "en": "Aching",
  //     "tl": "Kumikirot"
  //   },
  //   "shooting": {
  //     "en": "Shooting",
  //     "tl": "Kumukuryente"
  //   },
  //   "throbbing": {
  //     "en": "Throbbing",
  //     "tl": "Pumipintig"
  //   },
  //   "crushing": {
  //     "en": "Crushing",
  //     "tl": "Parang dinudurog"
  //   },
  //   "cutting": {
  //     "en": "Cutting",
  //     "tl": "Parang hinihiwa"
  //   },
  //   "numbing": {
  //     "en": "Numbing",
  //     "tl": "Nangangalay"
  //   },
  //   "tiring": {
  //     "en": "Tiring",
  //     "tl": "Nangangawit"
  //   },
  //   "stretching": {
  //     "en": "Stretching/Tugging",
  //     "tl": "Parang hinihila"
  //   },
  //   "pressing": {
  //     "en": "Pressing",
  //     "tl": "Nakadagan"
  //   },
  //   "symptoms_question": {
  //     "en": "Do You Feel Any Symptoms?",
  //     "tl": "Nakakaramdam ka ba ng kahit anong sintomas?"
  //   },
  //   "drowsiness": {
  //     "en": "Drowsiness",
  //     "tl": "Antukin"
  //   },
  //   "yes": {
  //     "en": "Yes",
  //     "tl": "Oo"
  //   },
  //   "no": {
  //     "en": "No",
  //     "tl": "Hindi"
  //   },
  //   "enter": {
  //     "en": "Enter symptom:",
  //     "tl": "Magpasok ng sintomas:"
  //   },
  //   "review": {
  //     "en": "Review",
  //     "tl": "Suriin"
  //   },
  //   "submit": {
  //     "en": "Submit",
  //     "tl": "i-Sumite"
  //   },
  //   "tiredness": {
  //     "en": "Tiredness",
  //     "tl": "Kapaguran"
  //   },
  //   "add_symptom": {
  //     "en": "Add Symptom",
  //     "tl": "Dagdagan"
  //   },
  //   "remove_symptom": {
  //     "en": "Remove Symptom",
  //     "tl": "Bawasan"
  //   },
  //   "right": {
  //     "en": "Right",
  //     "tl": "Kanan"
  //   },
  //   "left": {
  //     "en": "Left",
  //     "tl": "Kaliwa"
  //   },
  //   "scale": {
  //     "en": "Highlight the most appropriate number to indicate where the symptom is between the two extremes.",
  //     "tl": "I-highlight ang pinakaangkop na bilang upang malaman kung saan sa pagitan ng dalawang kaduluhan ang sintomas."
  //   },
  //   "drag": {
  //     "en": "Drag the pointer to move left and right the scale",
  //     "tl": "I-drag ang pointer upang ilipat sa kaliwa at kanang mga scale"
  //   },
  //   "tap_next": {
  //     "en": "Tap the Next arrow when you're finished.",
  //     "tl": "I-tap ang Susunod arrow kapag tapos ka na."
  //   },
  //   "tap_body": {
  //     "en": "Tap on the part of your body where you feel pain",
  //     "tl": "Tapikin ang bahagi ng iyong katawan na kung saan sa tingin mo masakit"
  //   },
  //   "tap_once": {
  //     "en": "Tap <b>once</b> for Mild Pain",
  //     "tl": "Tapikin <b>isang beses</b> para sa Mild Pain"
  //   },
  //   "tap_twice": {
  //     "en": "Tap <b>twice</b> for Moderate Pain",
  //     "tl": "Tapikin <b>dalawang beses</b> para sa Moderate Pain"
  //   },
  //   "tap_thrice": {
  //     "en": "Tap <b>thrice</b> for Severe Pain",
  //     "tl": "Tapikin <b>tatlong beses</b> para sa Matinding Sakit"
  //   },
  //   "tap_four": {
  //     "en": "Tap <b>four times</b> to reset",
  //     "tl": "Tapikin <b>apat na beses</b> upang i-reset"
  //   },
  // };

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
      return $http.get(API.src + API.esas_translations)
      .then(function successCallback(response) {
        response.data.symptoms_question = {
          "english": "Are you feeling any of this symptoms?",
          "tagalog": "May nararamdaman ka ba sa mga sintomas na ito?"
        };
        response.data.yes = {
          "english": "Yes",
          "tagalog": "Oo"
        };
        response.data.no = {
          "english": "No",
          "tagalog": "Hindi"
        };
        response.data.enter = {
          "english": "Enter symptom:",
          "tagalog": "Magpasok ng sintomas:"
        };
        response.data.review = {
          "english": "Review",
          "tagalog": "Suriin"
        };
        response.data.submit = {
          "english": "Submit",
          "tagalog": "i-Sumite"
        };
        response.data.add_symptom = {
          "english": "Add Symptom",
          "tagalog": "Dagdagan"
        };
        response.data.remove_symptom = {
          "english": "Remove Symptom",
          "tagalog": "Bawasan"
        };
        response.data.right = {
          "english": "Right",
          "tagalog": "Kanan"
        };
        response.data.left = {
          "english": "Left",
          "tagalog": "Kaliwa"
        };
        response.data.tap_next = {
          "english": "Tap the Next arrow when you're finished.",
          "tagalog": "I-tap ang Susunod arrow kapag tapos ka na."
        };
        response.data.tap_once = {
          "english": "Tap <b>once</b> for slight pain",
          "tagalog": "I-tap nang <b>isang beses</b> kung hindi gaanong masakit"
        };
        response.data.tap_twice = {
          "english": "Tap <b>twice</b> for moderate pain",
          "tagalog": "I-tap nang <b>dalawang beses</b> kung masakit"
        };
        response.data.tap_thrice = {
          "english": "Tap <b>thrice</b> for severe pain",
          "tagalog": "I-tap nang <b>tatlong beses</b> kung sobrang masakit"
        };
        response.data.tap_four = {
          "english": "Tap <b>four times</b> to reset pain level",
          "tagalog": "I-tap nang <b>apat na beses</b> upang ulitin ang antas ng pananak"
        };


        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_esas_results: function(patientId) {
      return $http.get(API.src + API.patient_esas_results + patientId)
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    }
  };
});
