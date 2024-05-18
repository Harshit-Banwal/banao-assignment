const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./Routes/authRouter');
const postRouter = require('./Routes/postRouter');
const dotenv = require('dotenv');
dotenv.config();

// Body-parser
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.status(201).send('Hello From backend..');
});

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

// Server Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is lstening on http://localhost:${port}`);
});
