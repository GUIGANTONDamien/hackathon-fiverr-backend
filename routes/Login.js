const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../mysql2');

router.post('/', (request, response) => {
  const { id, password } = request.body;
  pool.query('SELECT * FROM user WHERE id = ?', [id], (error, results) => {
    if (error) {
      response.send(error);
    } else {
      bcrypt.compare(password, results[0].password, (error, res) => {
        // compare le mot de passe de la db,
        if (res) {
          response.send(res);
          //  renvoies true
        } else if (error) {
          response.send(error);
        } else {
          response.send(res);
          // renvoies false
        }
      });
    }
  });
});

module.exports = router;
