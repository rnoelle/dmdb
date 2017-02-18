angular.module('dmdb')
  .controller('mainCtrl', function ($scope, dataService) {

      $scope.getMovies = function () {
        dataService.getMovies().then(function (response) {
          $scope.movies = response.data;
          $scope.chosen = 'movies';
          console.log(response);
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
        $scope.chosen = 'movies';
      }

      $scope.search = function (term, filter) {
        dataService.search(term, filter).then(function (response) {
          $scope.results = response.data;
        })
      }

  })
