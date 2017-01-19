import express from 'express';
import bodyParser from 'body-parser';

import movies from './movies';
import celebs from './celebs';

const app = express();

app.use(bodyParser.json());

app.get('/movies', function (req, res, next) {
  
})
app.get('/celebs', function (req, res, next) {

})

app.listen(3000, function () {
  console.log('listening on port 3000');
})
