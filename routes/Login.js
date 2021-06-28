const express = require('express');

const router = express.Router();
const pool = require('../database');

//récupérer tous les users existants
router.get('/', (request, response) => {
  pool.query('SELECT * FROM user', (error, results) => {
    if (error) {
      response.status(500).send(error);
      console.log(error);
    } else {
      response.send(results);
      console.log(results);
    }
  });
});

router.post('/', (request, response) => {
  const { lastname, firstname, email, pseudo, password } = request.body;
      pool.query(
        'INSERT INTO user (lastname, firstname, email, pseudo, password) VALUES (?,?,?,?,?)',
        [
          lastname,
          firstname,
          email,
          pseudo,
          password,
        ],
        // eslint-disable-next-line no-shadow
        (error) => {
          if (error) {
            response.status(500).send(`Error Creating new User${error}`);
          } else {
            response.status(200).send('User created');
          }
        }
      );
  });

module.exports = router;
