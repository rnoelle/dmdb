
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

app.post('/api/movies', function (req, res, next) {
  req.body.id = movies.length + 1;
  movies.push(req.body);
  res.status(200).send(req.body);
})

app.post('/api/celebs', function (req, res, next) {
  req.body.id = celebs.length + 1;
  celebs.push(req.body);
  res.status(200).send(req.body);
})
