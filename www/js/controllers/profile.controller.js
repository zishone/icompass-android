angular.module('iComPAsS.controllers')

.controller('ProfileCtrl', function($scope, $ionicLoading, API, USER_ROLES, AuthService, APIService){
  $scope.showLoading();

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

  $scope.user_profile = {};

  if(AuthService.role() === USER_ROLES.patient){
    APIService.get_patient_profile().then(function(data) {
      $scope.hideLoading();

      $scope.user_profile = $scope.getBasicInfo(data);

      // Parse JSON form data.weights
      var weights = [];
      for (var i = 0; i < data.weights.length; i++) {
        weights.push(JSON.parse(data.weights[i]));
      }

      $scope.user_profile.more = [
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
    });
  }else if(AuthService.role() === USER_ROLES.doctor){
    APIService.get_doctor_profile().then(function(data) {
      $scope.hideLoading();

      $scope.user_profile = $scope.getBasicInfo(data);

      $scope.user_profile.more = [
        {
          'label': 'Specialty',
          'data': [data.specialty]
        },
        {
          'label': 'Availability',
          'data': [data.available]
        }
      ];
    });
  }

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
});
