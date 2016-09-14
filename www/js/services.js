angular.module('iComPAsS.services', [])

.factory('AuthService', function($q, $http, USER_ROLES, SOURCES){
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var userID;
  var isAuthenticated = false;
  var role = '';
  var authToken;
  var user_type;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    userID = token.split(' ')[0];
    user_type = token.split(' ')[1];
    isAuthenticated = true;
    authToken = 'Bearer ' + token.split(' ')[2];

    if (user_type == 1) {
      role = USER_ROLES.admin;
    }
    if (user_type == 2) {
      role = USER_ROLES.patient;
    }
    if (user_type == 3) {
      role = USER_ROLES.doctor;
    }

    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }

  var login = function(uname, pw) {
    return $q(function(resolve, reject) {
      var data = {
        'username': uname,
        'password': pw
      };

      $http.post(SOURCES.api_src + 'auth', data)
      .then(function successCallback(response) {
        storeUserCredentials(response.data.id + ' ' + response.data.data.user_type + ' ' +  response.data.meta.token);
        resolve('Login success.');
      }, function errorCallback(response) {
        reject('Login Failed.');
      });
    });
  };

  var logout = function() {
    authToken = undefined;
    userID = undefined;
    user_type = undefined;
    isAuthenticated = false;
    role = '';
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
    userID: function() {return userID;},
    role: function() {return role;}
  };
})

.factory('APIService', function($http, AuthService, SOURCES){
  return {
    get_user_profile: function() {
      return $http.get(SOURCES.api_src + 'users/profile/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_patient_profile: function() {
      return $http.get(SOURCES.api_src + 'patients/profile/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_doctor_profile: function() {
      return $http.get(SOURCES.api_src + 'doctors/profile/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_patient_prescriptions: function() {
      return $http.get(SOURCES.api_src + 'patients/prescriptions/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_assigned_doctors: function() {
      return $http.get(SOURCES.api_src + 'patients/assigned_doctors/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_doctor_info: function(doctorId) {
      return $http.get(SOURCES.api_src + 'doctors/profile/' + doctorId)
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
  };
});
