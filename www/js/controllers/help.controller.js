angular.module('iComPAsS.controllers')

.controller('HelpCtrl', function($scope){
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.shownGroup = 'video_1';
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $scope.gotoYoutube= function(link) {
    console.log(link);
    //opens inapp browser
    window.open(link,'_self');
    //opens system browser
    window.open(link,'_system');
  };
});
