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
  })
