// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/lumen_et_veritas_quiz', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema
const winnerSchema = new mongoose.Schema({
  name: String,
  school: String,
  percentageResult: Number
});

const Winner = mongoose.model('Winner', winnerSchema);

app.use(bodyParser.json());

// Route to handle registration
app.post('/register', (req, res) => {
  const currentDate = new Date();
  const registrationDeadline = new Date(currentDate.getFullYear(), 9, 1); // October 1st
  if (currentDate > registrationDeadline) {
    return res.status(400).json({ error: 'Registration deadline has passed. Please contact administration.' });
  }

  // Handle registration logic here
  // Assuming request body contains school name and candidate details
  const { school, candidates } = req.body;
  // Save candidates to database
  // Implement payment logic here if necessary
  res.status(200).json({ message: 'Registration successful!' });
});

// Route to handle submitting quiz results
app.post('/submit-results', (req, res) => {
  // Handle submission of quiz results here
  // Assuming request body contains winner's name, school, and percentage result
  const { name, school, percentageResult } = req.body;
  const winner = new Winner({ name, school, percentageResult });
  winner.save()
    .then(() => {
      res.status(200).json({ message: 'Results submitted successfully!' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while saving results.' });
    });
});

// Route to get list of previous winners
app.get('/previous-winners', (req, res) => {
  // Retrieve previous winners from database
  Winner.find({})
    .then(winners => {
      res.status(200).json(winners);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while retrieving winners.' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
