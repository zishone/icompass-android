angular.module('iComPAsS.services')

.factory('MenuService', function($http, AuthService, USER_ROLES, API){
  // $http.defaults.cache = true

  return {
    get_menu_list: function(){
      var menuList = [];

      // list of menu
      if(AuthService.role() === USER_ROLES.patient){
        menuList = [
          {
            'icon': 'ion-ios-person',
            'text': 'Profile',
            'url': '#/menu/profile'
          },
          {
            'icon': 'ion-document',
            'text': 'Prescriptions',
            'url': '#/menu/prescriptions'
          },
          {
            'icon': 'ion-ios-body',
            'text': 'Take ESAS',
            'url': '#/menu/take-esas'
          },
          {
            'icon': 'ion-ios-people',
            'text': 'List of Doctors',
            'url': '#/menu/list-of-doctors'
          },
          {
            'icon': 'ion-ios-book',
            'text': 'Instructions',
            'url': '#/menu/instructions'
          },
          {
            'icon': 'ion-email',
            'text': 'Messages',
            'url': '#/menu/messages'
          },
          {
            'icon': 'ion-key',
            'text': 'Change Password',
            'url': '#/menu/change-password'
          },
          {
            'icon': 'ion-ios-help',
            'text': 'Help',
            'url': '#/menu/help'
          },
        ];
      }else if(AuthService.role() === USER_ROLES.doctor){
        menuList = [
          {
            'icon': 'ion-ios-person',
            'text': 'Profile',
            'url': '#/menu/profile'
          },
          {
            'icon': 'ion-ios-people',
            'text': 'List of Patients',
            'url': '#/menu/list-of-patients'
          },
          {
            'icon': 'ion-email',
            'text': 'Messages',
            'url': '#/menu/messages'
          },
          {
            'icon': 'ion-key',
            'text': 'Change Password',
            'url': '#/menu/change-password'
          },
          {
            'icon': 'ion-ios-help',
            'text': 'Help',
            'url': '#/menu/help'
          },
        ];
      }

      return menuList;
    },
    get_unread_count: function(){
      return $http.get(API.src + 'messages/unread')
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    }
  };
});
