angular.module('iComPAsS.controllers')

.controller('ProfileCtrl', function($scope, $ionicLoading, AuthService, ProfileService, USER_ROLES){
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

  $scope.populateProfile = function(){
    $scope.user_profile = {};

    if(AuthService.role() === USER_ROLES.patient){
      ProfileService.get_patient_profile().then(function(data) {
        $scope.hideLoading();

        $scope.user_profile = $scope.getBasicInfo(data);

        // Parse JSON form data.weights
        var weights = [];
        for (var i = 0; i < data.profile.weights.length; i++) {
          weights.push(JSON.parse(data.profile.weights[i]));
        }

        $scope.user_profile.more = [
          {
            'label': 'Diagnosis',
            'data': [data.profile.diagnosis]
          },
          {
            'label': 'Allergies',
            'data': data.profile.allergies.split(', ')
          },
          {
            'label': 'Initial Height',
            'data': [data.profile.height + ' cm']
          },
          {
            'label': 'Weight',
            'data': weights
          }
        ];
      })
      .finally(function(){
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    }else if(AuthService.role() === USER_ROLES.doctor){
      ProfileService.get_doctor_profile().then(function(data) {
        $scope.hideLoading();

        $scope.user_profile = $scope.getBasicInfo(data);

        $scope.user_profile.more = [
          {
            'label': 'Specialty',
            'data': [data.profile.specialty]
          },
          {
            'label': 'Availability',
            'data': [data.profile.available]
          }
        ];
      })
      .finally(function(){
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    $scope.getBasicInfo = function(data) {
      return {
        'image': data.meta.profile_pic,
        'fullname': data.profile.fname + ' ' + data.profile.mname + ' ' + data.profile.lname,
        'basic_info': [
          {
            'label': 'Username',
            'data': data.profile.username
          },
          {
            'label': 'Contact No.',
            'data': data.profile.contactnumber
          },
          {
            'label': 'E-mail',
            'data': data.profile.email
          },
          {
            'label': 'Birthday',
            'data': data.profile.bday
          },
          {
            'label': 'Age',
            'data': data.profile.age
          },
          {
            'label': 'Sex',
            'data': data.profile.gender === 'm'? 'Male' : 'Female'
          }
        ]
      };
    };
  };

  $scope.populateProfile();
});
