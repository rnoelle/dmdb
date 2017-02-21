angular.module('dmdb')
  .directive('thumbnail', function () {
    return {
      restrict: 'EA',
      templateUrl: './app/thumbnail/thumbnail.html',
      scope: {
        data: '='
      }
    }
  })
