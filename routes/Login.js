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
router.post('/', (req, res) => {
  const pseudo = req.body.pseudo;
  const password = req.body.password;
  pool.query(
    'SELECT * FROM user WHERE pseudo = ? AND password = ?',
    [pseudo, password],
    (error, result) => {
      if (error) {
        res.status(500).send({ error: error });
      }
      if (result.length) {
        res.send(true);
      } else {
        res.send({ message: 'Wrong username/password' });
      }
    }
  );
});
// router.post('/login', (request, response) => {
//   const { pseudo, password } = request.body;
//   pool.query(
//     'SELECT * FROM user WHERE pseudo = ?',
//     [pseudo, password],
//     (error, results) => {
//       if (error) {
//         response.send(error);
//       } else if (results.pseudo !== pseudo && results.password !== password) {
//         response.status(403).send('mot de passe ou em ail erroné');
//         console.log(results);
//       } else {
//         response.status(200).send(results);
//       }
//     }
//   );
// });

router.post('/', (request, response) => {
  const { lastname, firstname, email, pseudo, password } = request.body;
  pool.query(
    'INSERT INTO user (lastname, firstname, email, pseudo, password) VALUES (?,?,?,?,?)',
    [lastname, firstname, email, pseudo, password],
    // eslint-disable-next-line no-shadow
    (error, response) => {
      if (error) {
        response.status(500).send(`Error Creating new User${error}`);
        console.log(error);
      } else {
        response.status(200).send('User created');
      }
    }
  );
});

module.exports = router;
