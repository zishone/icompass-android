angular.module('iComPAsS.controllers')

.controller('TakeEsasCtrl', function($scope, TakeEsasService){
  var front = {
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
  };
  var back = {
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
  };

  $scope.setColor = function(body_part_id, counter){
    var color;
    var opacity;

    switch (counter) {
      case 1:
        color = '#FFFF00';
        opacity = '0.8';
        break;
      case 2:
        color = '#FFA500';
        opacity = '0.8';
        break;
      case 3:
        color = '#FF0000';
        opacity = '0.8';
        break;
      default:
        color = '#000000';
        opacity = '0.0';
    }

    document.getElementById(body_part_id).setAttribute('fill', color);
    document.getElementById(body_part_id).setAttribute('fill-opacity', opacity);
  };

  $scope.anteriorColorSwitch = function(body_part_id){
    if(front[body_part_id] === undefined){
      front[body_part_id] = 1;
    }else{
      front[body_part_id] += 1;
      front[body_part_id] %= 4;
    }

    $scope.setColor(body_part_id, front[body_part_id]);

    console.log(front);
  };

  $scope.posteriorColorSwitch = function(body_part_id){
    if(back[body_part_id] === undefined){
      back[body_part_id] = 1;
    }else{
      back[body_part_id] += 1;
      back[body_part_id] %= 4;
    }

    $scope.setColor(body_part_id, back[body_part_id]);

    console.log(back);
  };
});
