angular.module('iComPAsS.services')

.factory('AuthService', function($q, $http, USER_ROLES, API){
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

      $http.post(API.src + 'auth', data)
      .then(function successCallback(response) {
        storeUserCredentials(response.data.id + ' ' + response.data.data.user_type + ' ' +  response.data.meta.token);
        resolve('Login Success.');
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
});
