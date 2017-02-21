const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const movies = require('./movies');
const celebs = require('./celebs');


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('../public'))

app.get('/api/movies', function (req, res, next) {
  if (req.query.actor) {
    var actor = celebs.filter(function (el) {
      return el.id == req.query.actor;
    })[0]
    console.log(actor);
    var foundMovies = movies.filter(function (el) {
      return actor.movie_ids.indexOf(el.id) > -1
    })
    return res.status(200).send(foundMovies)
  }
  res.status(200).send(movies);
})

app.get('/api/celebs', function (req, res, next) {
  if (req.query.movie) {
    var actors = celebs.filter(function (el) {
      return el.movie_ids.indexOf(req.query.movie) > -1;
    })
    return res.status(200).send(actors)
  }
  res.status(200).send(celebs);
})

app.get('/api/search', function (req, res, next) {
  if (req.query.type == 'movie') {
    var results = movies.filter(function (el) {
      return el.title.toLowerCase().indexOf(req.query.search.toLowerCase()) > -1;
    })
    return res.status(200).send(results);
  }
  if (req.query.type == 'celeb') {
    var results = celebs.filter(function (el) {
      return el.name.toLowerCase().indexOf(req.query.search.toLowerCase()) > -1;
    })
    return res.status(200).send(results);
  }
  if (req.query.type == 'director') {
    var results = movies.filter(function (el) {
      return el.director.toLowerCase().indexOf(req.query.search.toLowerCase()) > -1;
    })
    return res.status(200).send(results);
  }
  res.status(404).send()
})

app.put('/api/celebs/:id', function (req, res, next) {
  for (var i = 0; i < celebs.length; i++) {
    if (celebs[i].id == req.params.id) {
      for (prop in req.body) {
        celebs[i][prop] = req.body[prop]
      }
      return res.status(200).send(celebs[i])
    }
  }
  res.status(404).send('not found')
})

app.put('/api/movies/:id', function (req, res, next) {
  for (var i = 0; i < movies.length; i++) {
    if (movies[i].id == req.params.id) {
      for (prop in req.body) {
        movies[i][prop] = req.body[prop]
      }
      return res.status(200).send(movies[i])
    }
  }
  res.status(404).send('not found')
})

app.post('/api/movies', function (req, res, next) {
  req.body.id = movies.length + 1;
  movies.push(req.body);
  console.log(movies[movies.length - 1]);
  res.status(200).send(req.body);
})

app.post('/api/celebs', function (req, res, next) {
  req.body.id = celebs.length + 1;
  celebs.push(req.body);
  res.status(200).send(req.body);
})

app.delete('/api/celebs/:id', function (req, res, next) {
  for (var i = 0; i < celebs.length; i++) {
    if (celebs[i].id == req.params.id) {
      var oldCeleb = celebs[i]
      celebs.splice(i, 1);
      return res.status(200).send(oldCeleb);
    }
  }
  res.status(404).send('not found')
})

app.delete('/api/movies/:id', function (req, res, next) {
  for (var i = 0; i < movies.length; i++) {
    if (movies[i].id == req.params.id) {
      var oldMovie = movies[i]
      movies.splice(i, 1);
      return res.status(200).send(oldMovie);
    }
  }
  res.status(404).send('not found')
})


app.listen(3000, function () {
  console.log('listening on port 3000');
})
