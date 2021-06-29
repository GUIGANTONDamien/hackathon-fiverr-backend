const express = require('express');

const router = express.Router();
const pool = require('../database');

router.post('/', (request, response) => {
  const formContent = request.body;
  console.log(formContent);
  pool.query(
    'INSERT INTO user(lastname, firstname, pseudo, email, password) VALUES (?, ?, ?, ?, ?) ',
    [
      formContent.lastname,
      formContent.firstname,
      formContent.pseudo,
      formContent.email,
      formContent.password,
    ],
    (error, results) => {
      if (error) {
        response.send(error);
      } else {
        response.send(results);
      }
    }
  );
});

module.exports = router;
