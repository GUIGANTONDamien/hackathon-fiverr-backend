const pool = require('../database');

express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  pool.query('SELECT * FROM user', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send(results);
    }
  });
});
module.exports = router;
