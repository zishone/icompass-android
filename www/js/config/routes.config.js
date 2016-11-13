angular.module('iComPAsS.config')

.config(function($stateProvider, $urlRouterProvider, USER_ROLES) {
  // Routes
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    onEnter: function($state, AuthService){
      if(AuthService.isAuthenticated()){
        $state.go('menu.profile');
      }
    }
  })

  .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })

  .state('menu.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('menu.prescriptions', {
    url: '/prescriptions',
    views: {
      'menuContent': {
        templateUrl: 'templates/prescriptions.html',
        controller: 'PrescriptionsCtrl'
      }
    }
  })

  .state('menu.take-esas', {
    url: '/take-esas',
    views: {
      'menuContent': {
        templateUrl: 'templates/take-esas.html'
      }
    }
  })

  .state('menu.list-of-doctors', {
    url: '/list-of-doctors',
    views: {
      'menuContent': {
        templateUrl: 'templates/list-of-doctors.html',
        controller: 'ListOfDoctorsCtrl'
      }
    }
  })

  .state('menu.list-of-patients', {
    url: '/list-of-patients',
    views: {
      'menuContent': {
        templateUrl: 'templates/list-of-patients.html',
        controller: 'ListOfPatientsCtrl'
      }
    }
  })

  .state('menu.doctor-detail', {
    url: '/doctor-detail/:doctorId',
    views: {
      'menuContent': {
        templateUrl: 'templates/doctor-detail.html',
        controller: 'DoctorDetailCtrl'
      }
    }
  })

  .state('menu.patient-detail', {
    url: '/patient-detail/:patientId',
    views: {
      'menuContent': {
        templateUrl: 'templates/patient-detail.html',
        controller: 'PatientDetailCtrl'
      }
    }
  })

  .state('menu.instructions', {
    url: '/instructions',
    views: {
      'menuContent': {
        templateUrl: 'templates/instructions.html'
      }
    }
  })

  .state('menu.messages', {
    url: '/messages',
    views: {
      'menuContent': {
        templateUrl: 'templates/messages.html',
        controller: 'MessagesCtrl'
      }
    }
  })

  .state('menu.message-detail', {
    url: '/message-detail/:messageId',
    views: {
      'menuContent': {
        templateUrl: 'templates/message-detail.html',
        controller: 'MessageDetailCtrl'
      }
    }
  })

  .state('menu.send-message', {
    url: '/send-message',
    views: {
      'menuContent': {
        templateUrl: 'templates/send-message.html',
        controller: 'SendMessageCtrl'
      }
    }
  })

  .state('menu.sent-messages', {
    url: '/sent-messages',
    views: {
      'menuContent': {
        templateUrl: 'templates/sent-messages.html',
        controller: 'SentMessagesCtrl'
      }
    }
  })

  .state('menu.sent-message-detail', {
    url: '/sent-message-detail/:messageId',
    views: {
      'menuContent': {
        templateUrl: 'templates/sent-message-detail.html',
        controller: 'SentMessageDetailCtrl'
      }
    }
  })

  .state('menu.change-password', {
    url: '/change-password',
    views: {
      'menuContent': {
        templateUrl: 'templates/change-password.html',
        controller: 'ChangePasswordCtrl'
      }
    }
  })

  .state('menu.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/help.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('login');
});
