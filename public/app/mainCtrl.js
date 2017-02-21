angular.module('dmdb')
  .controller('mainCtrl', function ($scope, dataService) {

      $scope.getMovies = function () {
        dataService.getMovies().then(function (response) {
          $scope.movies = response.data;
          $scope.chosen = 'movies';
        })
      }
      $scope.getMovies();

      $scope.getCelebs = function () {
        dataService.getCelebs().then(function (response) {
          $scope.celebs = response.data;
          $scope.chosen = 'celebs';
        })
      }

      $scope.openDetails = function (data) {
        $scope.chosen = 'details';
        $scope.details = data;
      }

      $scope.backToHome = function () {
        $scope.details = null;
        $scope.getMovies();
      }

      $scope.search = function (term, filter) {
        dataService.search(term, filter).then(function (response) {
          $scope.results = response.data;
          $scope.chosen = 'results';
        })
      }
      $scope.entity = {}
      $scope.addEntity = function (entity) {
        if (entity.title) {
          dataService.addMovie(entity).then(function (response) {
            $scope.entity = {};
            $scope.adding = false;
            $scope.getMovies();
          })
        } else {
          dataService.addCeleb(entity).then(function (response) {
            $scope.entity = {};
            $scope.adding = false;
            $scope.getCelebs();
          })
        }
      }

      $scope.updateOrder = function (value) {
        $scope.order = value;
      }

      $scope.toggleModal = function () {
        $scope.adding = !$scope.adding;
      }
      $scope.options = [{label: "Movie Title", value: 'movie'}, {label: "Celebrity", value: 'celeb'}, {label: "Director", value: 'director'}]
      $scope.searchFilter = 'movie'
  })
