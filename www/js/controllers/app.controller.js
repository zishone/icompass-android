angular.module('iComPAsS.controllers')

.controller('AppCtrl', function($scope, $window, $state, $ionicHistory, AuthService, API) {

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
      'image': API.profile_pic_src + data.image + '.jpg',
      'fullname': data.fname + ' ' + data.mname + ' ' + data.lname,
      'basic_info': [
        {
          'label': 'Username',
          'data': data.username
        },
        {
          'label': 'Contact No.',
          'data': data.contactnumber
        },
        {
          'label': 'E-mail',
          'data': data.email
        },
        {
          'label': 'Birthday',
          'data': data.bday
        },
        {
          'label': 'Age',
          'data': data.age
        },
        {
          'label': 'Sex',
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
});
