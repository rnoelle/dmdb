## Introduction
- In this project, you will be creating the server to make our DevMountain Movie Database (DMDb) work.
- You have been given a public folder with a pre-built angular app. You shouldn't have to change any of the code there except in dataService.js (inside the app folder). Here you will write API calls to interact with the backend.


## Step 1
Here we will be creating the basic express server - this server will connect to our data and listen for requests. It should also serve the public folder to the client. We will then need Body Parser to process the requests from the frontend.


### Detailed Instructions
- Make an index.js file and create a basic node server, using npm install to get the packages you need.
- Initialize the project folder with npm to create a package.json file.
- Use `npm install` to add express and body-parser to your project.
- Require each of these and save them to variables in your index.js file.

<details>
<summary>Solution</summary>
 ````javascript
  var express = require('express');
  var bodyParser = require('body-parser');
 ````
</details>

- Require each of the JSON files as well: ie `var movies = require('./movies');`
- Use express to initialize your app.

<details>
<summary>Solution</summary>
 ```javascript
  var app = express();
 ```
</details>

- Make sure to use body parser to process requests made to your server.

<details>
<summary>Solution</summary>
 ```javascript
  app.use(bodyParser.json())
 ```
</details>

- Have express serve the public folder to the client using express.static.

<details>
<summary>Solution</summary>
 ```javascript
  app.use(express.static('../public'))
 ```
</details>

- Have your app listen on port 3000, and console.log a message when it's working.

<details>
<summary>Solution</summary>
 ```javascript
  app.listen(3000, function () {
    console.log('listening on port', 3000)
  })
 ```
 </details>
 
- Start up nodemon and make sure everything is working correctly - you should see your console.log message in the terminal!


## Step 2
In this step, we will fill in the getMovies and getCelebs function in the dataService, then create cooresponding endpoints that send back all movies and all celebrities respectively.
### Detailed Instructions
- Our front-end should be getting a list of movies from the server. Find the getMovies function in dataService.js. Fill it in to return an http GET request to `/api/movies`. Have this function return the response.

<details>
<summary>Solution</summary>
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

- In index.js, let's write the endpoint for the front end to request. This endpoint needs to accept get requests at '/api/movies', and should respond with a status 200 and should send the entire movies.json.

<details>
<summary>Solution</summary>
 ```javascript
  app.get('movies', function (req, res, next) {
    res.status(200).send(movies);
  })
 ```
</details>

- Do the same for getCelebs and write a cooresponding endpoint which sends back a status 200 and the celebs JSON. If you looked at the solutions for getMovies, try to do this step on your own.

<details>
<summary>Solution</summary>
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


## Step 3
Here we will fill in the addMovie and addCeleb functions in our dataService - each will post the information in an object form to endpoints on our server. The server will add the movie or celebrity to the json object.
### Detailed Instructions
- Go in dataService.js to the function, addMovie. You can see that this function will take one parameter: movie. An object with all the data for the new movie will be passed in here. Fill in the function to make a 'POST' request to '/api/movies'. The data should be the movie object passed in as the parameter.

<details>
<summary>Solution</summary>
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

- Let's go to the server and add an endpoint that accepts post requests at '/api/movies'. This should add an id property to the object sent in the req.body and then push that object into the array in movies.json. (This won't change the actual file, but should save the movie until you restart your server again.) The id should always increment, depending on how many movies are in the array. Send back the new movie object in the server's response. If you want to push yourself, have your server check to make sure the object is in the correct format before pushing to the array - send back an error if it isn't in the correct format.

<details>
<summary>Solution</summary>
 ```javascript
  app.post('movies', function (req, res, next) {
    req.body.id = movies.length + 1;
    movies.push(req.body)
    res.status(200).send(req.body);
  })
 ```
</details>

- Do the same with the addCeleb function and its corresponding endpoint. If you looked at the solutions for addMovie, try to do this step on your own.

<details>
<summary>Solution</summary>

 ```javascript
  //  dataService.js:
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


## Step 4
In this step, we will be adding search functionality. We will fill in the search function in the dataService, then use queries to ask the server for the correct data. The server will need a get endpoint for the search, which will process the queries and send back the correct information.
### Detailed Instructions
- Go in dataService.js to the search function. You can see that this function takes in two parameters: term and filter. The term will be whatever the user submits in the search bar. The filter will determine what to search for (it will be selected by the dropdown beside the search bar). The filter could be one of three things: `'movie'`, `'celeb'`, or `'director'`.
- Have the search function make an http GET request to '/api/search'. Using the parameters, you should add two queries to the url, one term query with the term parameter as the value and one for the filter with the filter parameter as the value.

<details>
<summary>Solution</summary>
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
  - If the filter is 'movie', you should send back any movies whose titles contain the search term. Here, challenge yourself to make the search support partial matches (using indexOf) and case insensitive.
  - If the filter is 'celeb', you should send back any celebrities whose names contain the search. Again, you can challenge yourself to make it case insensitive and include partial matches.
  - If the filter is 'director', you should send back any movies whose directors contain the search.
  - If none of these filters are found, the endpoint should return a status 404 (Not found)

<details>
<summary>Solution</summary>
```javascript
app.get('/api/search', function (req, res, next) {
  if (req.query.filter == 'movie') {
    var results = movies.filter(function (el) {
      return el.title
                .toLowerCase()
                .indexOf(req.query.term.toLowerCase()) > -1;
    })
    return res.status(200).send(results);
  }
  if (req.query.filter == 'celeb') {
    var results = celebs.filter(function (el) {
      return el.name
                .toLowerCase()
                .indexOf(req.query.term.toLowerCase()) > -1;
    })
    return res.status(200).send(results);
  }
  if (req.query.filter == 'director') {
    var results = movies.filter(function (el) {
      return el.director
                .toLowerCase()
                .indexOf(req.query.term.toLowerCase()) > -1;
    })
    return res.status(200).send(results);
  }
  res.status(404).send()
})
```
</details>

When it works correctly, you should be able to search using any of the filters in the search dropdown:

![search](/screenshots/screenshot3.jpg)



***
## Black Diamond
***

- In the details folder, in details.js, find the line that is commented out and uncomment it out.
- Write two functions in dataService.js - one called getMoviesByActor and another called getActorsByMovie. They will each take in one parameter (an id), and should make http requests to the server. Once these return the proper data, you should have working references on each of your detail pages. Try to use your original GET endpoints, but now with queries.
  - getMoviesByActor will call an endpoint which you will create on your server. This endpoint should send back all movies that actor was in (all movie objects whose id is in the actor's movie_id array).
  - getActorsByMovie will be the same, but get all actors in a particular movie.
