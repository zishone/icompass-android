angular.module('iComPAsS.controllers')

.controller('AppCtrl', function($scope, $window, $state, $ionicHistory, $ionicLoading, $ionicPopup, $ionicPlatform, $ionicScrollDelegate, AuthService, API, USER_ROLES, APP_CONST) {
  $scope.months = APP_CONST.months;

  $scope.doLogout = function() {
    console.log('Doing logout');

    //remove OneSignal tags
    if (window.plugins && window.plugins.OneSignal) {
      window.plugins.OneSignal.sendTags({user_id: "null", user_type: "null"});
    }

    // Destroy saved credentials
    AuthService.logout();

    // Change state into login
    $state.go('login', {}, {reload: true}).then(function(){
<<<<<<< HEAD
      scope.clearBackView();
=======
      $scope.clearBackView();
>>>>>>> 79b0d6722bfe755943c891843a7fbbf12ea363eb
      $window.location.reload();
    });
  };

<<<<<<< HEAD

  $scope.clearBackView = function(){
=======
  $scope.clearBackView = function() {
>>>>>>> 79b0d6722bfe755943c891843a7fbbf12ea363eb
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
  };

  $scope.showLoading = function(){
    $ionicLoading.show({
      template: '<div style="height:100vh;width:100vw;">' +
                  '<img src="img/spinner.gif" alt="Loading..." width="100px" id="spinnerGif"/>' +
                '</div>',
      noBackdrop: true
    });
  };

  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  $scope.alertPopup = function(title, template){
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: template,
      cssClass: 'alert-popup'
    });
  };
  $scope.setTabsToOne = function() {
    $scope.tab = 1;
  };
  $scope.setTabsToOne();

  $scope.setTab = function(newTab){
    $scope.tab = newTab;
  };

  $scope.isSet = function(tabNum){
    return $scope.tab === tabNum;
  };

  $scope.isDoctor = function(){
    return AuthService.role() === USER_ROLES.doctor;
  };

  $scope.isPatient = function(){
    return AuthService.role() === USER_ROLES.patient;
  };

  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

  $scope.setColor = function(body_part_id, counter){
    var color;
    var opacity;

    switch (counter) {
      case 1:
        color = '#FFFF00';
        opacity = '0.8';
        break;
      case 2:
        color = '#FFA500';
        opacity = '0.8';
        break;
      case 3:
        color = '#FF0000';
        opacity = '0.8';
        break;
      default:
        color = '#000000';
        opacity = '0.0';
    }

    try {
      for (var i = 0; i < document.getElementsByClassName(body_part_id).length; i++) {
        document.getElementsByClassName(body_part_id)[i].setAttribute('fill', color);
        document.getElementsByClassName(body_part_id)[i].setAttribute('fill-opacity', opacity);
      }
    }
    catch(err) {}
  };

  $ionicPlatform.registerBackButtonAction(function(event) {
    if($scope.tab > 1 && state.current.name === "menu.take-esas"){
      $scope.setTab($scope.tab - 1);
    }else if ($ionicHistory.viewHistory().histories.ion2.cursor === 0 && $state.current.name !== "menu.profile") {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
<<<<<<< HEAD
      $state.go('menu.profile').then(function() {
        scope.clearBackView();
=======
      $state.go('menu.profile').then(function functionName() {
        $scope.clearBackView();
>>>>>>> 79b0d6722bfe755943c891843a7fbbf12ea363eb
      });
    }else if ($ionicHistory.viewHistory().histories.ion2.cursor > 0) {
      $ionicHistory.goBack();
    }else{
      navigator.app.exitApp();
    }
  }, 100);
});
