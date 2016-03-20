
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', { url: '/', templateUrl: '/templates/home.html', controller: 'homeCtrl' })
    .state('login', { url: '/login', templateUrl: './templates/login.html', controller: 'loginCtrl' })
    .state('dashboard', { url: '/dashboard', templateUrl: './templates/dashboard.html', controller: 'dashboardCtrl' })

})


// app.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
//
//   localStorageServiceProvider.setPrefix('userApp');
//
//   $stateProvider
//     .state('main', {
//       url: '/main?login',
//       template: '<main-page></main-page>',
//     })
//     .state('resource', {
//       url: '/resource/:resourceId',
//       template: '<resource-page></resource-page>',
//     })
//     .state('list', {
//       url: '/list',
//       template: '<list-page></list-page>',
//     });
//
//   $urlRouterProvider.otherwise('main');
//
// })
