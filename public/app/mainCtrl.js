angular.module('dmdb')
  .controller('mainCtrl', function ($scope, dataService) {

      $scope.getMovies = function () {
        dataService.getMovies().then(function (response) {
          $scope.movies = response;
        })
      }
  })
