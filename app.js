const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore');

const app = express();
app.use(morgan('dev'));

app.listen(8000, () => {
  console.log('Express server is listening on port 8000');
})

app.get('/', (req, res) => {
  //res.send('Hello Express');
  res.send(playstore);
})

app.get('/apps', (req, res) => {
  let sortBy = req.query.sort;
  let genres = req.query.genres;
  let acceptableGenres = ['Game','Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
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
    let genreCheck = genres.toLowerCase();
    let genreFixed = genreCheck[0].toUpperCase() + genreCheck.substr(1, genreCheck.length);
    
    if(!acceptableGenres.includes(genreFixed)){
      return res.status(400).send('Please filter by one of these: "Action, Puzzle, Strategy, Casual, Arcade, Card"');
    }

    // Better to get this working instead of temp for loop below ..
    // playstore.filter(app => {
    //   console.log(`app.Genres: ${app.Genres}; genreFixed: ${genreFixed}`);
    //   app.Genres.includes(genreFixed);
    // });

    for (let i = 0; i < playstore.length; i++) {
      if(playstore[i].Genres.includes(genreFixed))
      sorted.push(playstore[i]);
    }
    res.send(sorted);
  }
  
});