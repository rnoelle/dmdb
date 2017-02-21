angular.module('dmdb')
  .service('dataService', function ($http) {

    this.getMovies = function () {
      return $http({
        //Fill in the blanks here:


    }


    this.getCelebs = function () {
      return $http({
        //Fill in the blanks here:


    }


    this.addMovie = function (movie) {
      // Fill in the blanks here:


    }


    this.addCeleb = function (celeb) {
        // Fill in the blanks here:


    }


    this.search = function (term, filter) {
      //Fill in the blanks here.


    }


  })
