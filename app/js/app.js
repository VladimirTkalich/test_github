
'use strict';

var ghsApp = angular.module('githubSearch', ['ui.router']);

ghsApp.config(function($stateProvider) {
  var mainState = {
    name: 'main',
    url: '/',
    templateUrl: '/view/main.view.html'/*,
    controller: 'ghsCtrl'*/
  }

  var searchState = {
    name: 'search',
    url: '/search',
    templateUrl: '/view/search.view.html'
  }

  var repositoryState = {
    name: 'repository',
    url: '/repository',
    templateUrl: '/view/repository.view.html'
  }

  $stateProvider.state(mainState);
  $stateProvider.state(searchState);
  $stateProvider.state(repositoryState);
});

ghsApp.run(['$state', function ($state) {
   $state.transitionTo('main');
}]);
