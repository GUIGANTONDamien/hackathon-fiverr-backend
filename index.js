/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./database');
const port = process.env.PORT || 8080;
const { FRONTEND_URL } = process.env;

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);
app.use(express.json());

// Your code here!

// Don't write anything below this line!
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});