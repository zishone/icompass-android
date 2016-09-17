angular.module('ComPAssIon.controllers', [])

.controller('AppCtrl', function($scope, $window, $state, $ionicHistory, AuthService, SOURCES) {

  $scope.doLogout = function() {
    console.log('Doing logout');

    // Destroy saved credentials
    AuthService.logout();

    // Change state into login
    $state.go('login').then(function(){
      $window.location.reload();
      $scope.clearBackView();
    });
  };

  $scope.clearBackView = function() {
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
  };

  $scope.getBasicInfo = function(data) {
    return {
      'image': SOURCES.profile_pic_src + data.image + '.jpg',
      'fullname': data.fname + ' ' + data.mname + ' ' + data.lname,
      'basic_info': [
        {
          'icon': 'ion-person',
          'data': data.username
        },
        {
          'icon': 'ion-ios-telephone',
          'data': data.contactnumber
        },
        {
          'icon': 'ion-email',
          'data': data.email
        },
        {
          'icon': 'ion-calendar',
          'data': data.bday
        },
        {
          'icon': 'ion-calculator',
          'data': data.age
        },
        {
          'icon': 'ion-transgender',
          'data': data.gender === 'm'? 'Male' : 'Female'
        }
      ]
    };
  };

  $scope.getPatientMore = function(data, weights) {
    return [
      {
        'label': 'Diagnosis',
        'data': [data.diagnosis]
      },
      {
        'label': 'Allergies',
        'data': data.allergies.split(', ')
      },
      {
        'label': 'Initial Height',
        'data': [data.height + ' cm']
      },
      {
        'label': 'Weight',
        'data': weights
      }
    ];
  };

  $scope.getDoctorMore = function(data) {
    return [
      {
        'label': 'Specialty',
        'data': [data.specialty]
      },
      {
        'label': 'Availability',
        'data': [data.available]
      }
    ];
  };

  // Tab functionalities
  $scope.resetTabs = function(){
    $scope.classes = {};
    $scope.classes.basic_info_tab = ['active'];
    $scope.classes.more_tab = [];
    $scope.classes.basic_info = [];
    $scope.classes.more = ['hidden'];
  };
  $scope.resetTabs();
  $scope.showBasicInfo = function () {
    if($scope.classes.basic_info_tab.length < 1){
      $scope.classes.basic_info_tab.push('active');
    }
    $scope.classes.basic_info.pop('hidden');
    $scope.classes.more_tab.pop('active');
    if($scope.classes.more.length < 1){
      $scope.classes.more.push('hidden');
    }
  };
  $scope.showMore = function () {
    $scope.classes.basic_info_tab.pop('active');
    if($scope.classes.basic_info.length < 1){
      $scope.classes.basic_info.push('hidden');
    }
    if($scope.classes.more_tab.length < 1){
      $scope.classes.more_tab.push('active');
    }
    $scope.classes.more.pop('hidden');
  };
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService, USER_ROLES) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    AuthService.login($scope.loginData.username, $scope.loginData.password).then(function(authenticated) {
      // Prevent admin account from logging in
      if(AuthService.role() === USER_ROLES.admin){
        //destroy user credential becuase login was not really made
        AuthService.logout();
        var alertPopup = $ionicPopup.alert({
          title: 'Sorry!',
          template: 'Android verion of ComPAssIon is not available to this type of user.',
          cssClass: 'alert-popup'
        });
      }else{
        //redirect to profile
        $state.go('menu.profile', {}, {reload: true}).then(function(){
          $scope.clearBackView();
        });
      }

      // Clear loginData
      $scope.loginData = {};
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!',
        cssClass: 'alert-popup'
      });

      // Clear loginData
      $scope.loginData = {};
    });
  };
})

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
        'text': 'Inbox',
        'url': '#/menu/inbox'
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
        'icon': 'ion-ios-body',
        'text': 'ESAS Results',
        'url': '#/menu/esas-results'
      },
      {
        'icon': 'ion-email',
        'text': 'Inbox',
        'url': '#/menu/inbox'
      },
      {
        'icon': 'ion-email',
        'text': 'Message',
        'url': '#/menu/message'
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
})

.controller('ProfileCtrl', function($scope, AuthService, USER_ROLES, APIService){
  $scope.resetTabs();

  $scope.view_title = "Profile";

  $scope.user_profile = {};

  if(AuthService.role() === USER_ROLES.patient){
    APIService.get_patient_profile().then(function(data) {

      $scope.user_profile = $scope.getBasicInfo(data);

      // Parse JSON form data.weights
      var weights = [];
      for (var i = 0; i < data.weights.length; i++) {
        weights.push(JSON.parse(data.weights[i]));
      }

      $scope.user_profile.more = $scope.getPatientMore(data, weights);
    });
  }else if(AuthService.role() === USER_ROLES.doctor){
    APIService.get_doctor_profile().then(function(data) {

      $scope.user_profile = $scope.getBasicInfo(data);

      $scope.user_profile.more = $scope.getDoctorMore(data);
    });
  }
})

.controller('PrescriptionsCtrl', function($scope, APIService){
  APIService.get_patient_prescriptions().then(function(data) {
    $scope.prescriptions = data;
  });
})

.controller('ListOfDoctorCtrl', function($scope, APIService, SOURCES){
  $scope.profile_pic_src = SOURCES.profile_pic_src;
  APIService.get_assigned_doctors().then(function(data) {
    $scope.assign_doctors = data;
  });
})

.controller('DoctorProfileCtrl', function($scope, $stateParams, APIService){
  $scope.resetTabs();

  $scope.view_title = "Doctor's Profile";

  $scope.user_profile = {};

  APIService.get_doctor_info($stateParams.doctorId).then(function(data) {

    $scope.user_profile = $scope.getBasicInfo(data);

    $scope.user_profile.more = $scope.getDoctorMore(data);
  });
});
