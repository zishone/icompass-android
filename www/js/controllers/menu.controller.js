angular.module('iComPAsS.controllers')

.controller('MenuCtrl', function($scope, $interval, MenuService, APP_CONST) {
  $scope.populateMenu = function(){
    $scope.menuList = MenuService.get_menu_list();
    MenuService.get_unread_count().then(function(data) {
      for (var i = 0; i < $scope.menuList.length; i++) {
        if($scope.menuList[i].text === "Messages"){
          if (data.data.attributes.number_of_unread > 0) {
            $scope.menuList[i].text += " (" + data.data.attributes.number_of_unread + ")";
          }
          break;
        }
      }
    });
  };

  $scope.populateMenu();

  $interval(function() {
    $scope.populateMenu();
  }, APP_CONST.sync_interval);
});
