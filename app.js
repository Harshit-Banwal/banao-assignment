const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./Routes/authRouter');

// Body-parser
app.use(express.json());

// Database Connection
const mongo_url =
  'mongodb+srv://harshitbanwal849:jvLNCKw83Xv7cAci@cluster0.nekrntp.mongodb.net/banao-app?retryWrites=true&w=majority';

mongoose
  .connect(mongo_url)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.status(201).send('Hello From backend..');
});

app.use('/api/auth', authRouter);

// Server Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is lstening on http://localhost:${port}`);
});
