/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Login = require('./routes/Login');

const port = process.env.PORT || 8080;
const { FRONTEND_URL } = process.env;
const eventRouter = require('./routes/event');
const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use('/Login', Login);

// Your code here!

app.use('/event', eventRouter);

// Don't write anything below this line!
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
