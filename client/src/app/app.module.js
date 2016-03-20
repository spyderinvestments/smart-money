'use strict';

let app = angular.module('smartMoneyApp', [
  'ui.router',
  'LocalStorageModule'
])

app.constant('CONST', {
  // API_URL: 'https://desolate-sea-75202.herokuapp.com',
  API_URL: 'http://localhost:3000',
})

app.run(function (UserSrvc, LoginSrvc) {
  LoginSrvc.forceSSL();
  UserSrvc.locate();
  LoginSrvc.init(UserSrvc.requestMe);
})
