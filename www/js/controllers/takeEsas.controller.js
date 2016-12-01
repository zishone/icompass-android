angular.module('iComPAsS.controllers')

.controller('TakeEsasCtrl', function($scope, $ionicPopup, AuthService, TakeEsasService){
  var anteriorCounter = {};
  var posteriorCounter = {};

  $scope.setColor = function(body_part_id, counter){
    var color;
    var opacity;

    switch (counter) {
      case 0:
        color = '#000000';
        opacity = '0.0';
        break;
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

  $scope.anteriorSelect = function(body_part_id){
    if(anteriorCounter[body_part_id] === undefined){
      anteriorCounter[body_part_id] = 1;
    }else{
      anteriorCounter[body_part_id] += 1;
      anteriorCounter[body_part_id] %= 4;
    }

    $scope.setColor(body_part_id, anteriorCounter[body_part_id]);
  };

  $scope.posteriorSelect = function(body_part_id){
    if(posteriorCounter[body_part_id] === undefined){
      posteriorCounter[body_part_id] = 1;
    }else{
      posteriorCounter[body_part_id] += 1;
      posteriorCounter[body_part_id] %= 4;
    }

    $scope.setColor(body_part_id, posteriorCounter[body_part_id]);
  };
});
