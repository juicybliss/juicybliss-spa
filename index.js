const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const myData = require('./myData.json');

mongoose.connect('mongodb://localhost:27017/juicybliss');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('css', path.join(__dirname, '/css'));

app.get('/s/:pagename', (req, res) => {
  const { pagename } = req.params;
  const data = myData[pagename];
  if (data) {
    res.render(`${pagename}`, { ...data });
  } else {
    res.render('notfound', { pagename });
  }
});

// app.get('/r/:subreddit', (req, res) => {
//   const { subreddit } = req.params;
//   const data = redditData[subreddit];
//   if (data) {
//     res.render('subreddit', { ...data });
//   } else {
//     res.render('notfound', { subreddit });
//   }
// });

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
