const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite');

app.use(bodyParser());
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/strips', (req, res, next) => {
  db.all('SELECT * FROM Strip',
    function (error, rows) {
      if (error) {
        throw error;
      }
      res.send({ strips: rows });
    });

});

app.post('/strips', (req, res, next) => {
  const strip = req.body.strip;
  if (!strip.head || !strip.body || !strip.background || !strip.bubbleType) {
    return res.status(400).send();
  }
  db.run('INSERT INTO Strip (head, body, background, bubble_type, bubble_text, caption) VALUES ($head, $body, $background, $bubble_type, $bubble_text, $caption)', {
    $head: strip.head,
    $body: strip.body,
    $background: strip.background,
    $bubble_type: strip.bubbleType,
    $bubble_text: strip.bubbleText,
    $caption: strip.caption
  }, function(error) {
    if (error) {
      return res.status(500).send();
    }
    db.get('SELECT * FROM Strip WHERE id = $lastid', {
      $lastid: this.lastID
    }, function(error, row) {
      if (error || !row) {
        return res.status(500).send();
      } else {
        return res.status(201).send({strip: row});
      }
    })
  })
});

const PORT = process.env.PORT || 4001;

app.listen(PORT);

module.exports = app;
