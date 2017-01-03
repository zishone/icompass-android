angular.module('iComPAsS.controllers')

.controller('MenuCtrl', function($scope, $interval, MenuService, SYNC) {
  $scope.populateMenu = function(){
    $scope.menuList = MenuService.get_menu_list();
    MenuService.get_unread_count().then(function(data) {
      for (var i = 0; i < $scope.menuList.length; i++) {
        if($scope.menuList[i].text === "Messages"){
          if (data.data.attributes.number_of_unread > 0) {
            $scope.menuList[i].text += " (" + data.data.attributes.number_of_unread + ")";

            $scope.notify('1' + data.data.attributes.number_of_unread, 'New Message!', 'You have ' + data.data.attributes.number_of_unread + ' unread messages.', 'messages');
          }
          break;
        }
      }
    });
  };

  $scope.populateMenu();

  document.addEventListener('deviceready', function () {
    cordova.plugins.backgroundMode.onactivate = function () {
        $interval(function() {
          $scope.populateMenu();
        }, SYNC.interval);
    };
  }, false);
});
