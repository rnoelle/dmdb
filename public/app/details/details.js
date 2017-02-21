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
          getReferences()
        })


      }
    }
  })
