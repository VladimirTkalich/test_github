'use strict';

angular.module('githubSearch')
.controller('ghsCtrl', ['$scope', '$state', function ($scope, $state) {

    // The constructor of the base object "Repository"
    $scope.Repository = function (name, description, created, language){
          this.name = typeof name ==='string' ? name : '';             
          this.description = typeof description === 'string' ? description : '';
          if(this.description.length === 0) {this.description = ' Description is absent. ';}
          this.created = typeof created ==='string' ? created : '';
          this.language = typeof language ==='string' ? language : '';
    };

    $scope.selectedRepo = new $scope.Repository();

    $scope.data = {
          reposOnPage : 10,
          searchString : '',
          listReps : []
        };

    $scope.newSearch = function(){
      $state.transitionTo('main');
    };

    $scope.returnToSearch = function(){
      $state.transitionTo('search');
    };

    $scope.searchRepos = function(name){
      $scope.data.listReps.splice(0, $scope.data.listReps.length);
      if(typeof name !== 'string' || name.length == 0)
       { throw "Input name of repository" }

      Gh3.Repositories.search(name, {start_page : 1}, function (err, res) {
        if(err) { throw "outch ..." }

        $scope.data.listReps = Gh3.Repositories.getAll();
        $state.transitionTo('search');
      });

    };

    $scope.getNumberOfRepoFound = function(){
      return $scope.data.listReps.length;
    };

    $scope.showRepo = function(repository){
      if(!angular.isObject(repository)) 
        {return;}

      $scope.selectedRepo.name = repository.name;
      $scope.selectedRepo.description = repository.description;
      $scope.selectedRepo.created = repository.created;
      $scope.selectedRepo.language = repository.language;
      $state.transitionTo('repository');
    };

}]);
