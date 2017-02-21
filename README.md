## Summary
- You have been given a public folder with an angular movie app. You shouldn't have to change any of the code except for in dataService.js.


********************
##Black Diamond
********************

- In the details folder, in details.js, find the line that is commented out and uncomment it out.
- Write two functions - one called getMoviesByActor and another called getActorsByMovie. They will each take in one parameter (an id), and should make http requests to the server. Once these return the proper data, you should have working references on each of your detail pages. Try to use your original GET endpoints, but now with queries.
  - getMoviesByActor will call an endpoint which you will create on your server. This endpoint should send back all movies that actor was in. (All movie objects whose id is in the actor's )
  - getActorsByMovie will be the same, but get all actors in a particular movie.
