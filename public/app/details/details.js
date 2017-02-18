angular.module('dmdb')
  .directive('details', function() {
    return {
      restrict: 'EA',
      templateUrl: './app/details/details.html',
      scope: {
        data: '='
      },
      controller: function($scope, dataService) {
        $scope.update = Object.assign({}, $scope.data);

        $scope.cancelUpdate = function () {
          $scope.update = Object.assign({}, $scope.data);
          $scope.updating = false;
        }

        $scope.updateEntity = function(update) {
          if (update.title) {
            dataService.updateMovie(update).then(function(response) {
              return response;
            })
          } else {
            dataService.updateCeleb(update).then(function(response) {
              return response;
            })
          }
          
          Object.assign($scope.data, $scope.update);
          $scope.editing = false;
        }
      }
    }
  })
