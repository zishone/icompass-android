angular.module('iComPAsS.controllers')

.controller('TakePainDetectCtrl', function($scope, $state, UsersService, PainDetectService){
  $scope.pain_detect_enabled = 1;

  var initializePainDetectResult = function() {
    $scope.pain_detect_result = {
      sliders: {
        slider_1: 0,
        slider_2: 0,
        slider_3: 0
      },
      radio: {
        radio_1: ''
      },
      questions: {
        question_1: undefined,
        question_2: undefined,
        question_3: undefined,
        question_4: undefined,
        question_5: undefined,
        question_6: undefined,
        question_7: undefined
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
      ]
    };
  };
  initializePainDetectResult();

  $scope.gotoReview = false;

  $scope.almostFinished = function() {
    $scope.gotoReview = true;
  };

  $scope.notAlmostFinished = function() {
    $scope.gotoReview = false;
  };

  $scope.translations = PainDetectService.get_pain_detect_translations();

  $scope.progress = {
    options: {
      floor: 1,
      ceil: 13,
      showTicks: true,
      hidePointerLabels: true,
      hideLimitLabels: true,
      readOnly: true,
      showSelectionBar: true,
      getSelectionBarColor: function(value) {
        return 'blue';
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

  $scope.radios = [
    {
      text: 'Persistent pain with slight fluctuations',
      image: 'radio_1.png',
      value: 'a'
    },
    {
      text: 'Persistent pain with pain attacks',
      image: 'radio_2.png',
      value: 'b'
    },
    {
      text: 'Pain attacks without pain between them',
      image: 'radio_3.png',
      value: 'c'
    },
    {
      text: 'Pain attacks with pain between them',
      image: 'radio_4.png',
      value: 'd'
    }
  ];

  $scope.choices = [
    {
      text: 'Never',
      value: 0
    },
    {
      text: 'Hardly Noticed',
      value: 1
    },
    {
      text: 'Slightly',
      value: 2
    },
    {
      text: 'Moderately',
      value: 3
    },
    {
      text: 'Strongly',
      value: 4
    },
    {
      text: 'Very Strongly',
      value: 5
    }
  ];

  $scope.anteriorColorSwitch = function(body_part_id){
    $scope.pain_detect_result.diagrams[0].anterior[body_part_id] += 1;
    $scope.pain_detect_result.diagrams[0].anterior[body_part_id] %= 3;

    var num;
    switch ($scope.pain_detect_result.diagrams[0].anterior[body_part_id]) {
      case 0:
        num = 0;
        break;
      case 1:
        num = 3;
        break;
      case 2:
        num = 1;
        break;
      default:
        num = 0;
    }

    $scope.setColor(body_part_id, num);
  };

  $scope.posteriorColorSwitch = function(body_part_id){
    $scope.pain_detect_result.diagrams[1].posterior[body_part_id] += 1;
    $scope.pain_detect_result.diagrams[1].posterior[body_part_id] %= 3;

    var num;
    switch ($scope.pain_detect_result.diagrams[1].posterior[body_part_id]) {
      case 0:
        num = 0;
        break;
      case 1:
        num = 3;
        break;
      case 2:
        num = 1;
        break;
      default:
        num = 0;
    }

    $scope.setColor(body_part_id, num);
  };

  $scope.submitPainDetect = function() {
    $scope.showLoading();

    PainDetectService.submit_pain_detect($scope.pain_detect_result).then(function(data) {
      $scope.hideLoading();

      $scope.alertPopup('Success!', 'Have a great day!');

      initializePainDetectResult();

      $scope.goHome();
    }, function(err) {
      $scope.hideLoading();

      $scope.alertPopup('Submission Failed!', 'Please try again!');
    });
  };
});
