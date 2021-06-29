const express = require('express');

const router = express.Router();
const pool = require('../database');

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

module.exports = router;
