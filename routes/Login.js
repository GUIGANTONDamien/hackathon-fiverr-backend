const express = require('express');

const router = express.Router();
const pool = require('../database');

router.post('/', (request, response) => {
  const { pseudo, password } = request.body;
  console.log(pseudo, password);
  pool.query(
    'SELECT * FROM user WHERE pseudo = ?',
    [pseudo, password],
    (error, results) => {
      if (error) {
        response.send(error);
      } else if (results.pseudo === pseudo && results.password === password) {
        response.send(results);
      }
    }
  );
});

module.exports = router;
