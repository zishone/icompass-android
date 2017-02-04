angular.module('iComPAsS.controllers')

.controller('TakeEsasCtrl', function($scope, UsersService, EsasService){
  $scope.showLoading();

  UsersService.get_patient_profile().then(function(data) {
    $scope.hideLoading();

    // $scope.esas_enabled = data.profile.esas_enabled;
    $scope.esas_enabled = 1;

  });

  EsasService.get_esas_translations().then(function(data) {
    $scope.translations = data;
    $scope.translations.symptoms_question = {
      english: "Do You Feel Any Symptoms?",
      tagalog: "Nakakaramdam ka ba ng kahit anong simptomas?"
    };
    $scope.translations.drowsiness = {
      english: "Drowsiness",
      tagalog: "Antukin"
    };
  });

  $scope.esas_result = {
    pain_result: {
      pain: 0,
      tiredness: 0,
      nausea: 0,
      anxiety: 0,
      depression: 0,
      drowsiness: 0,
      lack_of_appetite: 0,
      wellbeing: 0,
      shortness_of_breath: 0,
      other_symptoms: []
    },
    diagrams: [
      {
        anterior: {
          "anterior_head_r": 0,
          "anterior_head_l": 0,
          "face_r": 0,
          "face_l": 0,
          "neck_r": 0,
          "neck_midline": 0,
          "neck_l": 0,
          "anterior_shoulder_r": 0,
          "upper_chest_r": 0,
          "upper_chest_l": 0,
          "anterior_shoulder_l": 0,
          "anterior_upperarm_r": 0,
          "lower_chest_r": 0,
          "lower_chest_l": 0,
          "anterior_upperarm_l": 0,
          "antecubital_r": 0,
          "hypochondriac_r": 0,
          "epigastric": 0,
          "hypochondriac_l": 0,
          "antecubital_l": 0,
          "umbilical": 0,
          "lumbar_r": 0,
          "anterior_forearm_r": 0,
          "wrist_r": 0,
          "hand_r": 0,
          "anterior_thigh_r": 0,
          "hip_r": 0,
          "inguinal_r": 0,
          "anterior_perineum": 0,
          "inguinal_l": 0,
          "hypogastric": 0,
          "iliac_r": 0,
          "iliac_l": 0,
          "lumbar_l": 0,
          "hip_l": 0,
          "anterior_forearm_l": 0,
          "anterior_thigh_l": 0,
          "wrist_l": 0,
          "hand_l": 0,
          "knee_l": 0,
          "knee_r": 0,
          "anterior_ankle_r": 0,
          "anterior_ankle_l": 0,
          "anterior_leg_r": 0,
          "foot_r": 0,
          "foot_l": 0,
          "anterior_leg_l": 0
        }
      },
      {
        posterior: {
          "posterior_head_l": 0,
          "posterior_head_r": 0,
          "nape_l": 0,
          "nape_midline": 0,
          "nape_r": 0,
          "posterior_shoulder_l": 0,
          "upper_thorax_midline": 0,
          "posterior_shoulder_r": 0,
          "posterior_upperarm_r": 0,
          "lower_thorax_r": 0,
          "lower_thorax_midline": 0,
          "lower_thorax_l": 0,
          "posterior_upperarm_l": 0,
          "posterior_forearm_l": 0,
          "elbow_l": 0,
          "posterior_hand_l": 0,
          "buttock_l": 0,
          "posterior_perineum": 0,
          "buttock_r": 0,
          "flank_r": 0,
          "lower_back_midline": 0,
          "flank_l": 0,
          "elbow_r": 0,
          "posterior_forearm_r": 0,
          "posterior_hand_r": 0,
          "posterior_thigh_r": 0,
          "posterior_thigh_l": 0,
          "posterior_leg_r": 0,
          "posterior_leg_l": 0,
          "popliteal_r": 0,
          "popliteal_l": 0,
          "posterior_ankle_l": 0,
          "posterior_ankle_r": 0,
          "foot_sole_l": 0,
          "foot_sole_r": 0
        }
      }
    ],
    pain_types: []
  };

  $scope.setLanguage = function(language) {
    $scope.language = language;
  };

  $scope.anteriorColorSwitch = function(body_part_id){
    $scope.esas_result.diagrams[0].anterior[body_part_id] += 1;
    $scope.esas_result.diagrams[0].anterior[body_part_id] %= 4;

    $scope.setColor(body_part_id, $scope.esas_result.diagrams[0].anterior[body_part_id]);
  };

  $scope.posteriorColorSwitch = function(body_part_id){
    $scope.esas_result.diagrams[1].posterior[body_part_id] += 1;
    $scope.esas_result.diagrams[1].posterior[body_part_id] %= 4;

    $scope.setColor(body_part_id, $scope.esas_result.diagrams[1].posterior[body_part_id]);
  };

  $scope.progress = {
    options: {
      floor: 1,
      ceil: 7,
      showTicks: true,
      hidePointerLabels: true,
      hideLimitLabels: true,
      readOnly: true
    }
  };

  $scope.pain_slider = {
    options: {
        showSelectionBar: true,
        getSelectionBarColor: function(value) {
          if (value <= 3)
            return 'yellow';
          if (value <= 6)
            return 'orange';
          return 'red';
      },
      floor: 0,
      ceil: 10
    }
  };

  $scope.enableSliders = function() {
    $scope.pain_slider.readOnly = false;
  };

  $scope.addSymptom = function() {
    $scope.esas_result.pain_result.other_symptoms.push({
      key: '',
      value: 0
    });
  };
  $scope.removeSymptom = function() {
    $scope.esas_result.pain_result.other_symptoms.splice(-1, 1);
  };

  $scope.pain_types = EsasService.get_pain_types();

  $scope.addPainType = function(pain_type, checked){
    var tempObj = {
      type: pain_type
    };
    if(checked){
      $scope.esas_result.pain_types.push(tempObj);
    }else{
      $scope.esas_result.pain_types.splice($scope.esas_result.pain_types.indexOf(tempObj), 1);
    }
  };

  $scope.submitEsas = function() {
    $scope.showLoading();
    
    EsasService.submit_esas($scope.esas_result).then(function(data) {
      $scope.hideLoading();

      $scope.alertPopup('Success!', 'Have a great day!');
    }, function(err) {
      $scope.hideLoading();

      $scope.alertPopup('Submission Failed!', 'Please try again!');
    });
  };
});
