## Summary
- You will be building the server for DevMoutain's Movie Database, DMDb. You have been given a public folder with a pre-built angular app. You shouldn't have to change any of the code there except in dataService.js (inside the app folder). Here you will write API calls to interact with the backend.
- Go to dataService.js now and you will see hollow functions. Each of these will need to be filled in for the app to work.
- You also should have a server folder with two JSON files which will hold the data for this project. You will be creating a server in this file that will complete the functionality of our app.


## Server Setup
Make an index.js file and create a basic node server, using npm install to get the packages you need.

1. Initialize the project folder with npm to create a package.json file.
2. Use `npm install` to add express and body-parser to your project.
3. Require each of these and save them to variables in your index.js file.
<details>
 <summary>See the Code Here</summary>
 ```javascript
  var express = require('express');
  var bodyParser = require('body-parser');
 ```
</details>
4. Require each of the JSON files as well: ie `const movies = require('./movies');`
5. Use express to initialize your app.
<details>
 <summary>See the Code Here</summary>
 ```javascript
  var app = express();
 ```
</details>
6. Make sure to use body parser to process requests made to your server.
<details>
 <summary>See the Code Here</summary>
 ```javascript
  app.use(bodyParser.json())
 ```
</details>
7. Have express serve the public folder to the client using express.static.
<details>
 <summary>See the Code Here</summary>
 ```javascript
  app.use(express.static('../public'))
 ```
</details>
8. Have your app listen on port 3000, and console.log a message when it's working.
<details>
 <summary>See the Code Here</summary>
 ```javascript
  app.listen(3000, function () {
    console.log('listening on port', 3000)
  })
 ```
</details>
9. Start up nodemon and make sure everything is working correctly!


## Get
We need to fill in the getMovies and getCelebs function in the dataService, then create cooresponding endpoints that send back all movies and all celebs respectively.
- Our front-end should be getting a list of movies from the server. Find the getMovies function in dataService.js. This should return an http request. This should be a GET request to `/api/movies`. Have this function return the response.
<details>
 <summary>See the Code Here</summary>
 ```javascript
  this.getMovies = function () {
    return $http({
      method: 'GET',
      url: '/api/movies'
    }).then(function (response) {
      return response;
    })
  }

 ```
</details>
- In index.js, let's write the endpoint for the front end to request. This endpoint needs to accept get requests at '/api/movies', and should respond with a status 200 and the entire movies.json.
<details>
 <summary>See the Code Here</summary>
 ```javascript
  app.get('movies', function (req, res, next) {
    res.status(200).send(movies);
  })
 ```
</details>
- Try to do the same for getCelebs and the cooresponding endpoint which sends back a status 200 and the celebs JSON.
<details>
 <summary>See the Code Here</summary>
dataService.js:
 ```javascript

   this.getCelebs = function () {
     return $http({
       method: 'GET',
       url: '/api/celebs'
     }).then(function (response) {
       return response;
     })
   }

// In the index.js:

  app.get('celebs', function (req, res, next) {
    res.status(200).send(movies);
  })
 ```
</details>

The end result should look like this:
![main page](/screenshots/screenshot1.jpg)


## POST
- Go in dataService.js to the function, addMovie. This function should make a 'POST' request to '/api/movies'. The data should be the movie object passed in as the parameter.
<details>
 <summary>See the Code Here</summary>
 ```javascript
  this.addMovie = function (movie) {
    return $http({
      method: 'POST',
      url: '/api/movies',
      data: movie
    }).then(function (response) {
      return response;
    })
  }

 ```
</details>
- Let's go to the server and add an endpoint that accepts post requests at '/api/movies'. This should add an id property to the object sent in the req.body and then push that object into the array in movies.json. (This won't change the actual file, but should save the movie until you restart your server again.) Send back the new movie object.
<details>
 <summary>See the Code Here</summary>
 ```javascript
  app.post('movies', function (req, res, next) {
    req.body.id = movies.length + 1;
    movies.push(req.body)
    res.status(200).send(req.body);
  })
 ```
</details>
- Try to do the same with the addCeleb function and its corresponding endpoint.
<details>
 <summary>See the Code Here</summary>
dataService.js:
 ```javascript

   this.addCeleb = function (movie) {
     return $http({
       method: 'POST',
       url: '/api/celebs',
       data: movie
     }).then(function (response) {
       return response;
     })
   }
  
  // In index.js:
  
  app.post('celebs', function (req, res, next) {
    req.body.id = celebs.length + 1;
    celebs.push(req.body)
    res.status(200).send(req.body);
  })
 ```
</details>

When it works correctly, you will be able to add a movie to your 'database' using the add modal:
![add modal](/screenshots/screenshot2.jpg)


## SEARCH
- Go in dataService.js to the search function. You can see that this function takes in two parameters: term and filter. The term will be whatever the user submits in the search bar. The filter will determine what to search for (it will be selected by the dropdown beside the search bar). The filter could be one of three things: `'movie'`, `'celeb'`, or `'director'`.
- Have the search function make an http request to '/api/search'. Using the parameters, you should add two queries to the url, one for the term and one for the filter.
<details>
 <summary>See the Code Here</summary>
 ```javascript
  this.search = function (term, filter) {
    return $http({
      method: 'GET',
      url: '/api/search?term=' + term + '&filter=' + filter
    }).then(function (response) {
      return response;
    })
  }

 ```
</details>
- In your server, you will need to make an endpoint that accepts 'GET' requests at '/api/search'. We will need to check to see what the filter query is in order to decide what to send back.
  - If the filter is 'movie', you should send back any movies whose titles contain the search. Here, challenge yourself to make the search support partial matches (using indexOf) and case insensitive.
  - If the filter is 'celeb', you should send back any celebrities whose names contain the search.
  - If the filter is 'director', you should send back any movies whose directors contain the search.
  - If none of these filters are found, the endpoint should return a status 404 (Not found)

When it works correctly, you should be able to search using any of the filters in the search dropdown:
![search](/screenshots/screenshot3.jpg)

<details>
<summary>See the code here</summary>
```javascript
app.get('/api/search', function (req, res, next) {
  if (req.query.type == 'movie') {
    var results = movies.filter(function (el) {
      return el.title
                .toLowerCase()
                .indexOf(req.query.search.toLowerCase()) > -1;
    })
    return res.status(200).send(results);
  }
  if (req.query.type == 'celeb') {
    var results = celebs.filter(function (el) {
      return el.name
                .toLowerCase()
                .indexOf(req.query.search.toLowerCase()) > -1;
    })
    return res.status(200).send(results);
  }
  if (req.query.type == 'director') {
    var results = movies.filter(function (el) {
      return el.director
                .toLowerCase()
                .indexOf(req.query.search.toLowerCase()) > -1;
    })
    return res.status(200).send(results);
  }
  res.status(404).send()
})
```
</details>



********************
##Black Diamond
********************

- In the details folder, in details.js, find the line that is commented out and uncomment it out.
- Write two functions in dataService.js - one called getMoviesByActor and another called getActorsByMovie. They will each take in one parameter (an id), and should make http requests to the server. Once these return the proper data, you should have working references on each of your detail pages. Try to use your original GET endpoints, but now with queries.
  - getMoviesByActor will call an endpoint which you will create on your server. This endpoint should send back all movies that actor was in (all movie objects whose id is in the actor's movie_id array).
  - getActorsByMovie will be the same, but get all actors in a particular movie.
