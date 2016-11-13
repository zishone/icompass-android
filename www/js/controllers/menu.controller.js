angular.module('iComPAsS.controllers')

.controller('MenuCtrl', function($scope, MenuService) {
  $scope.populateMenu = function(){
    $scope.menuList = MenuService.get_menu_list();
  };

  $scope.populateMenu();
});
