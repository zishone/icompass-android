angular.module('iComPAsS.controllers')

.controller('TakeEsasCtrl', function($scope, $state, $ionicPopup, UsersService, EsasService){
  $scope.showLoading();

  //checks if enabled
  UsersService.get_patient_profile().then(function(data) {
    $scope.hideLoading();

    // $scope.esas_enabled = data.profile.esas_enabled;
    $scope.esas_enabled = 1;

  });

  //instantiatize esas_results
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

  //instantiatize chekcboxes
  $scope.checked = {
    sharp: false,
    stabbing: false,
    pricking: false,
    burning: false,
    boring: false,
    splitting: false,
    aching: false,
    shooting: false,
    throbbing: false,
    crushing: false,
    cutting: false,
    numbing: false,
    tiring: false,
    stretching: false,
    pressing: false
  };

  $scope.tagalog_pain_types = [];

  $scope.translations = EsasService.get_esas_translations();

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

  //slider options
  $scope.progress = {
    options: {
      floor: 1,
      ceil: 7,
      showTicks: true,
      hidePointerLabels: true,
      hideLimitLabels: true,
      readOnly: true,
      showSelectionBar: true,
      getSelectionBarColor: function(value) {
        return '#40C4FF';
      }
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

  // for other symptoms
  $scope.addSymptom = function() {
    $scope.esas_result.pain_result.other_symptoms.push({
      key: '',
      value: 0
    });
    var alertPopup = $ionicPopup.alert({
      title: $scope.translations.add_symptom[$scope.language],
      template: '<input type="text" ng-model="esas_result.pain_result.other_symptoms[esas_result.pain_result.other_symptoms.length-1].key">',
      scope: $scope,
      cssClass: 'alert-popup',
      buttons: [
        {
          text: 'Cancel',
          type: 'button-danger',
          onTap: function(e) {
            $scope.removeSymptom();
          }
        },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.esas_result.pain_result.other_symptoms[$scope.esas_result.pain_result.other_symptoms.length-1].key) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.esas_result.pain_result.other_symptoms[$scope.esas_result.pain_result.other_symptoms.length-1].key;
            }
          }
        }
      ]
    });
  };
  $scope.removeSymptom = function() {
    $scope.esas_result.pain_result.other_symptoms.splice(-1, 1);
  };

  //reset pain questions
  $scope.zeroPain = function(){
    $scope.esas_result.pain_result.pain = 0;
    $scope.esas_result.pain_types = [];
    $scope.tagalog_pain_types = [];

    for (var anterior in $scope.esas_result.diagrams[0].anterior) {
      $scope.esas_result.diagrams[0].anterior[anterior] = 0;
      $scope.setColor(anterior, $scope.esas_result.diagrams[0].anterior[anterior]);
    }

    for (var posterior in $scope.esas_result.diagrams[1].posterior) {
      $scope.esas_result.diagrams[1].posterior[posterior] = 0;
      $scope.setColor(posterior, $scope.esas_result.diagrams[1].posterior[posterior]);
    }

    for (var pain_type in $scope.checked) {
      $scope.checked[pain_type] = false;
    }

    $scope.setTab(7);
  };

  // reset symptoms if no symptoms
  $scope.noSymptoms = function(){
    $scope.esas_result.pain_result = {
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
    };
    $scope.zeroPain();
  };

  //for the checkboxes
  $scope.addPainType = function(pain_type, tagalog_pain_type, checked){
    var tempObj = {
      type: pain_type
    };
    if(checked){
      $scope.esas_result.pain_types.push(tempObj);
    }else{
      $scope.esas_result.pain_types.splice($scope.esas_result.pain_types.indexOf(tempObj), 1);
    }

    var tagalog_tempObj = {
      type: tagalog_pain_type
    };
    if(checked){
      $scope.tagalog_pain_types.push(tagalog_tempObj);
    }else{
      $scope.tagalog_pain_types.splice($scope.esas_result.pain_types.indexOf(tagalog_tempObj), 1);
    }

  };

  $scope.submitEsas = function() {
    $scope.showLoading();

    EsasService.submit_esas($scope.esas_result).then(function(data) {
      $scope.hideLoading();

      $scope.noSymptoms();

      $scope.alertPopup('Success!', 'Have a great day!');

      $scope.goHome();
    }, function(err) {
      $scope.hideLoading();

      $scope.alertPopup('Submission Failed!', 'Please try again!');
    });
  };
});
