## Summary
- You have been given a public folder with an angular movie app. You shouldn't have to change any of the code except for in dataService.js (inside the app folder).
- Go there now and you will see hollow functions. Each of these needs to be filled in for the app to work.
- You also should have a server folder with two JSON files which will hold the data for this project.


## Server Setup
1. Initialize the project folder with npm to create a package.json file.
2. Use `npm install` to add express and body-parser to your project.
3. Require each of these and save them to variables in your server.js file.
4. Require each of the JSON files as well: ie `const movies = require('./movies');`
5. Use express to initialize your app: `var app = express()`
6. Make sure to use body parser to process requests made to your server: `app.use(bodyParser.json())`
7. Have express serve the public folder to the client: `app.use(express.static('../public'))`
8. Have your app listen on port 3000, and console.log a message when it's working.
9. Start up nodemon and make sure everything is working correctly!

## Get
- Our front-end should be getting a list of movies from the server. Find the getMovies function in dataService.js. This should return an http request. This should be a GET request to `/api/movies`. Have this function return the response.
- In server.js, let's write the endpoint for the front end to request. This endpoint needs to accept get requests at '/api/movies', and should respond with a status 200 and the entire movies.json.
- Try to do the same for getCelebs and the cooresponding endpoint which sends back a status 200 and the celebs JSON.

The end result should look like this:
![main page](/screenshots/screenshot1.jpg)

## POST
- Go in dataService.js to the function, addMovie. This function should make a 'POST' request to '/api/movies'. The data should be the movie object passed in as the parameter.
- Let's go to the server and add an endpoint that accepts post requests at '/api/movies'. This should add an id property to the object sent in the req.body and then push that object into the array in movies.json. (This won't change the actual file, but should save the movie until you restart your server again.)
- Try to do the same with the addCeleb function and its corresponding endpoint.
- When it works correctly, you will be able to add a movie to your 'database'.

********************
##Black Diamond
********************

- In the details folder, in details.js, find the line that is commented out and uncomment it out.
- Write two functions - one called getMoviesByActor and another called getActorsByMovie. They will each take in one parameter (an id), and should make http requests to the server. Once these return the proper data, you should have working references on each of your detail pages. Try to use your original GET endpoints, but now with queries.
  - getMoviesByActor will call an endpoint which you will create on your server. This endpoint should send back all movies that actor was in. (All movie objects whose id is in the actor's )
  - getActorsByMovie will be the same, but get all actors in a particular movie.
