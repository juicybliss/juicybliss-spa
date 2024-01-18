const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(3001, () => {
  console.log('Listening on port 30001');
});
