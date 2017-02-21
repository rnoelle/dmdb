angular.module('dmdb')
  .directive('details', function() {
    return {
      restrict: 'EA',
      templateUrl: './app/details/details.html',
      scope: {
        data: '='
      },
      controller: function($scope, dataService) {

        $scope.openDetails = function (data) {
          $scope.$parent.openDetails(data)
        }
        $scope.update = Object.assign({}, $scope.data);

        var getReferences = function () {
          if ($scope.data.title) {
            dataService.getActorsByMovie($scope.data.id).then(function (response) {
              $scope.references = response.data;
            })
          } else {
            dataService.getMoviesByActor($scope.data.id).then(function (response) {
              $scope.references = response.data;
            })
          }
        }
        $scope.$watch('data', function (a,b) {
          // TODO:  
          // getReferences() --  UNCOMMENT THIS LINE FOR BLACK DIAMOND
        })

        $scope.cancelUpdate = function () {
          $scope.update = Object.assign({}, $scope.data);
          $scope.updating = false;
        }

        $scope.updateEntity = function(update) {
          if (update.title) {
            dataService.updateMovie(update)
          } else {
            dataService.updateCeleb(update)
          }

          Object.assign($scope.data, $scope.update);
          $scope.updating = false;
        }

        $scope.delete = function (id) {
          if ($scope.data.title) {
            dataService.deleteMovie(id).then(function (response) {
              $scope.$parent.getMovies()
            })
          } else {
            dataService.deleteCeleb(id).then(function (repsonse) {
              $scope.$parent.getCelebs()
            })
          }
        }

      }
    }
  })
