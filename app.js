const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore');

const app = express();
app.use(morgan('dev'));

app.listen(8000, () => {
  console.log('Express server is listening on port 8000');
})

app.get('/', (req, res) => {
  res.send('Hello Express');
})

app.get('/apps', (req, res) => {
  let sortBy;
  let genres;

  if(req.query.sort) {
    sortBy = req.query.sort;
  }

  if(req.query.genres) {
    genres = req.query.genres;
  }
    
  // if(!a) {
  //   return res.status(400).send('Please provide the "a" variable');
  // }

  res.send(playstore); 
});