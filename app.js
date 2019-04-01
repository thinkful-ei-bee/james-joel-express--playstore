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
  let response;

  if(req.query.sort) {
    sortBy = req.query.sort;
    if(sortBy === 'rating') {
      response = 'Sort by: ' + sortBy;
    }
    else if(sortBy === 'app') {
      response = 'Sort by: ' + sortBy;
    }
    else {
      return res.status(400).send('Please sort by either "rating" or "app"');
    }
  }

  // if(!a) {
  //   return res.status(400).send('Please provide the "a" variable');
  // }

  res.send(response); 
});