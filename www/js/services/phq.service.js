angular.module('iComPAsS.services')

.factory('PhqService', function($http, $q, API){
  // $http.defaults.cache = true;

  var translations = {
    "two_weeks": {
      "en": "Over the <b>last 2 weeks</b>, how often have you been bothered by any of the following problems?",
      "tl": "Sa paglipas ng mga <b>2 lingo</b>, kung gaano kadalas mo ay bothered sa pamamagitan ng alinman sa mga sumusunod na problema?"
    },
    "choice_1": {
      "en": "Not at all",
      "tl": "Hindi talaga"
    },
    "choice_2": {
      "en": "Several days",
      "tl": "Ilang araw"
    },
    "choice_3": {
      "en": "More than half the days",
      "tl": "Mahigit sa kalahati ng mga araw"
    },
    "choice_4": {
      "en": "Nearly every day",
      "tl": "Halos araw-araw"
    },
    "question_1": {
      "en": "1. Little interest or pleasure in doing things:",
      "tl": "1. Little interes o kasiyahan sa paggawa ng mga bagay:"
    },
    "question_2": {
      "en": "2. Feeling down, depressed, or hopeless:",
      "tl": "2. Feeling down, nalulumbay, o walang pag-asa:"
    },
    "question_3": {
      "en": "3. Trouble bumabagsak o manatili tulog, o natutulog masyadong maraming:",
      "tl": "3. Trouble falling or staying asleep, or sleeping too much:"
    },
    "question_4": {
      "en": "4. Feeling tired or having little energy:",
      "tl": "4. Feeling pagod o pagkakaroon ng maliit na enerhiya:"
    },
    "question_5": {
      "en": "5. Poor appetite or overeating:",
      "tl": "5. Mahina ganang kumain o overeating:"
    },
    "question_6": {
      "en": "6. Feeling bad about yourself or that you are a failure or have let yourself or your family down:",
      "tl": "6. Feeling masama tungkol sa iyong sarili o na ikaw ay isang kabiguan o may hayaan ang iyong sarili o sa iyong pamilya down:"
    },
    "question_7": {
      "en": "7. Trouble concentrating on things, such as reading the newspaper or watching television:",
      "tl": "7. Problema isip nang lubusan sa mga bagay, gaya ng pagbabasa ng pahayagan o nanonood ng telebisyon:"
    },
    "question_8": {
      "en": "8. Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual:",
      "tl": "8. Paglilipat o pagsasalita kaya dahan-dahan na ang ibang tao ay maaaring magkaroon ng napansin? O ang kabaligtaran - sa pagiging kaya hindi mapakali o hindi mapakali na ikaw ay gumagalaw sa palibot ng maraming higit pa kaysa sa karaniwan:"
    },
    "question_9": {
      "en": "9. If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
      "tl": "9. Kung minarkahan mo ang anumang problema, kung paano mahirap ay ang mga problemang ito na ginawa ito para sa iyo upang gawin ang iyong trabaho, mag-ingat ng mga bagay sa bahay, o makakuha ng kasama sa ibang mga tao?"
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
