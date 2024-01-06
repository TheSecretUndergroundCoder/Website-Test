// Example using Express and MongoDB

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('https://thesecretundergroundcoder.github.io/Website-Test/', { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  
  newUser.save((err) => {
    if (err) {
      res.status(500).send('Error signing up');
    } else {
      res.status(200).send('Signup successful');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
