'use strict';

angular.module('driverloanDocsV1App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngFileUpload'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });