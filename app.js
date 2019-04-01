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

  if(sortBy) {
    
    if(sortBy === 'rating') {
      console.log('hi from rating')

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
      return res.status(400).send('Please sort by either "rating" or "app"');
    }
  }

  // if(!a) {
  //   return res.status(400).send('Please provide the "a" variable');
  // }

  res.send(playstore); 
});