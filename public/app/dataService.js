angular.module('dmdb')
  .service('dataService', function ($http) {

    this.addMovie = function (movie) {
      console.log(movie);
      return $http({
        method: 'POST',
        url: '/api/movies',
        data: movie
      }).then(function (response) {
        return response
      })
    }

    this.addCeleb = function (celeb) {
      return $http({
        method: 'POST',
        url: '/api/celebs',
        data: celeb
      }).then(function (response) {
        return response
      })
    }

    this.search = function (term, filter) {
      return $http({
        method: 'GET',
        url: '/api/search?search='+ term + '&type=' + filter
      }).then(function (response) {
        console.log(response);
        return response;
      })
    }

    this.getActorsByMovie = function (id) {
      console.log(id);
      return $http({
        method: 'GET',
        url: '/api/celebs?movie=' + id
      }).then(function (response) {
        return response;
      })
    }

    this.getMoviesByActor = function (id) {
      return $http({
        method: 'GET',
        url: '/api/movies?actor=' + id
      }).then(function (response) {
        return response;
      })
    }

  })
