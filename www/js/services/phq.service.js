angular.module('iComPAsS.services')

.factory('PhqService', function($http, $q, API){
  // $http.defaults.cache = true;

  var translations = {
    "two_weeks": {
      "en": "Over the <b>last 2 weeks</b>, how often have you been <br> bothered by any of the following problems?",
      "tl": "Sa paglipas ng mga <b>2 lingo</b>, kung gaano kadalas <br> mo ay bothered sa pamamagitan ng alinman <br> sa mga sumusunod na problema?"
    },
    "choice_1": {
      "en": "Not at all",
      "tl": "Hindi kailanman"
    },
    "choice_2": {
      "en": "Several days",
      "tl": "Maraming araw"
    },
    "choice_3": {
      "en": "More than half the days",
      "tl": "Lagpas sa kalahati ng bilang ng mga araw"
    },
    "choice_4": {
      "en": "Nearly every day",
      "tl": "Halos araw-araw"
    },
    "choice_1a": {
      "en": "Not difficult at all",
      "tl": "Hinding-hindi Pinahirapan"
    },
    "choice_2a": {
      "en": "Somewhat difficult",
      "tl": "Medyo Pinahirapan"
    },
    "choice_3a": {
      "en": "Very difficult",
      "tl": "Masyadong Pinahirapan"
    },
    "choice_4a": {
      "en": "Extremely difficult",
      "tl": "Labis na Pinahirapan"
    },
    "question_1": {
      "en": "1. Little interest or pleasure in doing things:",
      "tl": "1. Di gaanong interesado o nasisiyahan sa paggawa ng mga bagay:"
    },
    "question_2": {
      "en": "2. Feeling down, depressed, or hopeless:",
      "tl": "2. Pakiramdam na nalulungkot, nadidipress o nawawalan ng pag-asa:"
    },
    "question_3": {
      "en": "3. Trouble falling or staying asleep, or sleeping too much:",
      "tl": "3. Hirap na makatulog o manatiling tulog, o labis na pagtulog:"
    },
    "question_4": {
      "en": "4. Feeling tired or having little energy:",
      "tl": "4. Pagkaramdam ng pagod o walang lakas:"
    },
    "question_5": {
      "en": "5. Poor appetite or overeating:",
      "tl": "5. Kawalan ng ganang kumain o labis na pagkain:"
    },
    "question_6": {
      "en": "6. Feeling bad about yourself or that you are a failure or have let yourself or your family down:",
      "tl": "6. Pagkaramdam ng masama tungkol sa iyong sarili — o na bigo ka o nabigo mo ang iyong sarili o ang iyong pamilya:"
    },
    "question_7": {
      "en": "7. Trouble concentrating on things, such as reading the newspaper or watching television:",
      "tl": "7. Hirap magtuon ng pansin sa mga bagay, tulad ng pagbabasa ng dyaryo or panonood ng telebisyon:"
    },
    "question_8": {
      "en": "8. Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual:",
      "tl": "8. Pagkilos o pagsasalita ng mabagal na maaring napansin ng ibang tao? O ang kabaligtaran — pagiging alumpihit o di mapakali kaya ikot nang ikot nang higit sa karaniwan:"
    },
    "question_9": {
      "en": "9. If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
      "tl": "9. Kung may tsinekan kang anumang mga problema, gaano ka pinahirapan ng mga problemang ito na gawin ang iyong trabaho, asikasuhin ang mga bagay sa bahay, o makisama sa ibang tao?"
    },
    "submit": {
      "en": "Submit",
      "tl": "i-Sumite"
    }
  };

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
    submit_phq: submit_phq,
    get_phq_translations: function(){
      return translations;
    }
  };
});
