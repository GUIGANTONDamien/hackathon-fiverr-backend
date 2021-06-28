const pool = require('../database');

express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  pool.query('SELECT * FROM event', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send(results);
    }
  });
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  pool.query('SELECT * FROM event WHERE id = ?', [id], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send(results[0]);
    }
  });
});

router.post('/', (request, response) => {
  const formContent = request.body;
  console.log(formContent);
  // format de la date doit etre : 2020-10-14 :18:00
  pool.query(
    'INSERT INTO event (title, description, date, user_id) VALUE (?, ?, ?, ?)',
    [
      formContent.title,
      formContent.description,
      formContent.date,
      formContent.user_id,
    ],
    (error, results) => {
      console.log(results);
      if (error) {
        response.status(500).send(error);
        console.log(error);
      } else {
        response.status(201).send('ok');
        //id: results.insertId, title, description, date
        console.log(results);
      }
    }
  );
});

router.delete('/:id', (request, response) => {
  const { id } = request.params;
  pool.query('DELETE FROM event WHERE id = ?', [id], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send('Evenement supprimé');
    }
  });
});

//si ça marche pas essayer .post back et front
router.put('/:id', (request, response) => {
  const { id } = request.params;
  const dataToUpdate = request.body;
  pool.query(
    'UPDATE event SET ? WHERE id = ? ',
    [dataToUpdate, id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(200).send(results);
      }
    }
  );
});

module.exports = router;
