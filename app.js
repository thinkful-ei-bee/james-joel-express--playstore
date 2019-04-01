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
  let sortBy = req.query.sort;
  let genres = req.query.genres;
  let acceptableGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
  let sorted = [];

  if(sortBy) {
    if(sortBy === 'rating') {
      console.log('hi from rating')
      playstore.sort((a, b) => {
        if(a.Rating < b.Rating) { return -1; }
        if(a.Rating > b.Rating) { return 1; }
        return 0;
      })
    }
    else if(sortBy === 'app') {
      //response = 'Sort by: ' + sortBy;
      playstore.sort((a, b) => {
        if(a.App < b.App) { return -1; }
        if(a.App > b.App) { return 1; }
        return 0;
      })
    }
    
    else {
      return res.status(400).send('Please filter by one of these:  "rating" or "app"');
    }
  }

  if(genres) {
    
    if(!acceptableGenres.includes(genres)) {
      return res.status(400).send('Please filter by one of these: "Action, Puzzle, Strategy, Casual, Arcade, Card"');
    }

    sorted = playstore.map(app => {
      app.Category
    })
    console.log(genres)
  }

  // if(!a) {
  //   return res.status(400).send('Please provide the "a" variable');
  // }

  res.send(playstore); 
});