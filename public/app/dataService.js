angular.module('dmdb')
  .service(function ($http) {
    this.getMovies = function () {
      return $http({
        //Fill in the blanks here:
        method: 'GET',
        url: '/movies'
      }).then(function (response) {
        return response.data;
      })
    }
    this.getCelebs = function () {
      return $http({
        //Fill in the blanks here:
        method: 'GET',
        url: '/celebs'
      }).then(function (response) {
        return response.data;
      })
    }
  })
