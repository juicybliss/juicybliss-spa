const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');
const myData = require('./myData.json');

app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(path.join(__dirname, '/images')));
// app.use(express.static(path.join(process.cwd(), '/images')));
// app.use(express.static(path.join(__dirname, '/public/css')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('css', path.join(__dirname, '/css'));
// app.set('images', path.join(__dirname, '/images'));

app.get('/:home', (req, res) => {
  const { home } = req.params;
  const data = myData[home];
  if (data) {
    res.render('home', { ...data });
  } else {
    res.render('notfound', { home });
  }
});

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render('subreddit', { ...data });
  } else {
    res.render('notfound', { subreddit });
  }
});

app.listen(3001, () => {
  console.log('Listening on port 30001');
});
