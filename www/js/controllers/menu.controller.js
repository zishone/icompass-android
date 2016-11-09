angular.module('iComPAsS.controllers')

.controller('MenuCtrl', function($scope, $state, AuthService, USER_ROLES) {

  // list of menu
  if(AuthService.role() === USER_ROLES.patient){
    $scope.menuList = [
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
    $scope.menuList = [
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
});
