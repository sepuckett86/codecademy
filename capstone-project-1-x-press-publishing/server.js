const express = require("express");
const app = express();

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

app.get('/api/artists', (req, res, next) => {
  db.all('SELECT * FROM Artist WHERE is_currently_employed = 1',
    function (error, rows) {
      if (error) {
        throw error;
      }
      console.log(rows);
      res.status(200).send({ artists: rows });
    });
});

app.get('/api/artists/:id', (req, res, next) => {
  db.get('SELECT * FROM Artist WHERE id = $id',
  {
    $id: req.params.id
  },
    function (error, row) {
      if (error || !row) {
      res.status(404).send();
    } else {
      res.status(200).send({artist: row});
      }
    });
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server is listening at PORT 4000");
});

module.exports = app;
