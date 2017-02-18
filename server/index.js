const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const movies = require('./movies');
// const celebs = require('./celebs');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('../public'))

app.get('/movies', function (req, res, next) {
  res.status(200).send(movies);
})
app.get('/celebs', function (req, res, next) {
  res.status(200).send(celebs);
})

app.listen(3000, function () {
  console.log('listening on port 3000');
})
