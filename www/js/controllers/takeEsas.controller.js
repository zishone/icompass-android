angular.module('iComPAsS.controllers')

.controller('TakeEsasCtrl', function($scope, AuthService, TakeEsasService){
  $scope.anteriorSelect = function(part){
    console.log(part);
  };

  $scope.posteriorSelect = function(part){
    console.log(part);
  };
});
