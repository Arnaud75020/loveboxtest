const express = require('express');
const os = require('os');

const app = express();
app.use(express.static('dist'));

// We don't care about data persistency: you can use this global variable as a fake "database".
const MESSAGES = [];

// Routes
app.get('/api/username', (req, res) => {
  res.send({ username: os.userInfo().username });
});

app.get('/api/status', (req, res) => {
  res.send({ status: 'OK' });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
