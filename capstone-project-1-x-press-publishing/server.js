const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

app.use(cors());
app.use(bodyParser());
app.use(morgan('dev'));
app.use(express.static('public'));


app.get('/api/artists', (req, res, next) => {
  db.all('SELECT * FROM Artist WHERE is_currently_employed = 1',
    function (error, rows) {
      if (error) {
        throw error;
      }
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

app.post('/api/artists/', (req, res, next) => {
  const newArtist = req.body.artist;
  if (!newArtist.name || !newArtist.dateOfBirth || !newArtist.biography) {
    return res.status(400).send();
  } else {
  db.run('INSERT INTO Artist (name, date_of_birth, biography) VALUES ($name, $date_of_birth, $biography)', {
  $name: newArtist.name,
  $date_of_birth: newArtist.dateOfBirth,
  $biography: newArtist.biography,
}, function(error) {
  if (error) {
   res.status(500).send();
 } else {
  db.get('SELECT * FROM Artist WHERE id = $lastid', {
    $lastid: this.lastID
  }, function(error, row) {
    if (error || !row) {
       res.status(500).send();
    } else {
       res.status(201).send({artist: row});
    }
  })
  }
})
}
});

app.put('/api/artists/:id', (req, res, next) => {
  const updatedArtist = req.body.artist;
  // check if artist id exists
  const sqlCheck = 'SELECT * FROM Artist WHERE id = $id';
  db.get(sqlCheck, {
    $id: req.params.id
  }, function(error, row) {
    if (error || !row) {
      res.status(400).send();
    } else {
      if (!updatedArtist.name || !updatedArtist.dateOfBirth || !updatedArtist.biography) {
        return res.status(400).send();
      } else {
        const sql = 'UPDATE Artist SET name = $name, date_of_birth = $date_of_birth, biography = $biography, is_currently_employed = $is_currently_employed WHERE id = $id';
        db.run(sql, {
          $name: updatedArtist.name,
          $date_of_birth: updatedArtist.dateOfBirth,
          $biography: updatedArtist.biography,
          $is_currently_employed: updatedArtist.isCurrentlyEmployed,
          $id: req.params.id
        }, function(error) {
          if (error) {
             res.status(500).send();
           } else {
             db.get('SELECT * FROM Artist WHERE id = $id', {
               $id: req.params.id
             }, function(error, row) {
               if (error || !row) {
                  res.status(500).send();
               } else {
                  res.status(200).send({artist: row});
               }
             })
          }
        })
      }
    }
  })

});

app.delete('/api/artists/:id', (req, res, next) => {
  db.run('UPDATE Artist SET is_currently_employed = 0 WHERE id = $id',
{
  $id: req.params.id
}, function(error) {
  if (error) {
  res.status(400).send();
  } else {
  db.get('SELECT * FROM Artist WHERE id = $id', {
    $id: req.params.id
  }, function(error, row) {
    if (error || !row) {
      res.status(400).send()
    } else {
      res.status(200).send({artist:row});
    }
  })
}
})
})

app.get('/api/series', (req, res, next) => {
  const sql = 'SELECT * FROM Series';
  db.all(sql, function(error, rows) {
    if (error) {
      res.status(400).send();
    } else {
      res.status(200).send({series: rows})
    }
  })
})

app.get('/api/series/:id', (req, res, next) => {
  const sql = 'SELECT * FROM Series WHERE id = $id';
  db.get(sql, {
    $id: req.params.id
  }, function(error, row) {
    if (error || !row) {
      res.status(404).send();
    } else {
      res.status(200).send({series: row})
    }
  })
})

app.post('/api/series/', (req, res, next) => {
  const newSeries = req.body.series;
  if (!newSeries.name || !newSeries.description) {
    return res.status(400).send();
  } else {
  db.run('INSERT INTO Series (name, description) VALUES ($name, $description)', {
  $name: newSeries.name,
  $description: newSeries.description
}, function(error) {
  if (error) {
   res.status(500).send();
 } else {
  db.get('SELECT * FROM Series WHERE id = $lastid', {
    $lastid: this.lastID
  }, function(error, row) {
    if (error || !row) {
       res.status(500).send();
    } else {
       res.status(201).send({series: row});
    }
  })
  }
})
}
});

app.put('/api/series/:id', (req, res, next) => {
  const updatedSeries = req.body.series;
  // check if artist id exists
  const sqlCheck = 'SELECT * FROM Series WHERE id = $id';
  db.get(sqlCheck, {
    $id: req.params.id
  }, function(error, row) {
    if (error || !row) {
      res.status(400).send();
    } else {
      if (!updatedSeries.name || !updatedSeries.description) {
        return res.status(400).send();
      } else {
        const sql = 'UPDATE Series SET name = $name, description = $description WHERE id = $id';
        db.run(sql, {
          $name: updatedSeries.name,
          $description: updatedSeries.description,
          $id: req.params.id
        }, function(error) {
          if (error) {
             res.status(500).send();
           } else {
             db.get('SELECT * FROM Series WHERE id = $id', {
               $id: req.params.id
             }, function(error, row) {
               if (error || !row) {
                  res.status(500).send();
               } else {
                  res.status(200).send({series: row});
               }
             })
          }
        })
      }
    }
  })
});

app.delete('/api/series/:id', (req, res, next) => {
  //check if id exists
  db.get('SELECT * FROM Series WHERE id = $id', {
    $id: req.params.id
  }, function(error, row) {
    if (error || !row) {
       res.status(500).send();
    } else {
      // Check for related issues
      db.get('SELECT * FROM Issue WHERE series_id = $id', {
        $id: req.params.id
      }, function(error, row) {
        if (row) {
          return res.status(400).send();
        } else {
          db.run('DELETE FROM Series WHERE id = $id', {
            $id: req.params.id
          }, function(error) {
            if (error) {
              res.status(400).send()
            } else {
              res.status(204).send()
            }
          })
        }
      })
    }
  })
})

app.get('/api/series/:seriesId/issues', (req, res, next) => {
//check if series exists
  db.get('SELECT * FROM Series WHERE id = $id', {
    $id: req.params.seriesId
  }, function(error, row) {
    if (error || !row) {
      res.status(404).send()
    } else {
      db.all('SELECT * FROM Issue WHERE series_id = $id', {
        $id: req.params.seriesId
      }, function(error, rows) {
        if (error) {
          res.status(404).send()
        } else {
          res.status(200).send({issues: rows})
        }
      })
      }
    })
})

app.post('/api/series/:seriesId/issues', (req, res, next) => {
  const newIssue = req.body.issue;
  if (!newIssue.name || !newIssue.issueNumber || !newIssue.publicationDate || !newIssue.artistId) {
    return res.status(400).send();
  } else {
  db.run('INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id) VALUES ($name, $issue_number, $publication_date, $artist_id, $series_id)', {
  $name: newIssue.name,
  $issue_number: newIssue.issueNumber,
  $publication_date: newIssue.publicationDate,
  $artist_id: newIssue.artistId,
  $series_id: req.params.seriesId
}, function(error) {
  if (error) {
   return res.status(500).send();
 } else {
  db.get('SELECT * FROM Issue WHERE id = $lastid', {
    $lastid: this.lastID
  }, function(error, row) {
    if (error || !row) {
       return res.status(500).send();
    } else {
       return res.status(201).send({issue: row});
    }
  })
  }
})
}
});

app.put('/api/series/:seriesId/issues/:issueId', (req, res, next) => {
  const updatedIssue = req.body.issue;
  // check if issue id exists
  const sqlCheck = 'SELECT * FROM Issue WHERE id = $id';
  db.get(sqlCheck, {
    $id: req.params.issueId
  }, function(error, row) {
    if (error || !row) {
      res.status(404).send();
    } else {
      if (!updatedIssue.name || !updatedIssue.issueNumber || !updatedIssue.publicationDate || !updatedIssue.artistId) {
        return res.status(400).send();
      } else {
        const sql = 'UPDATE Issue SET name = $name, issue_number = $issueNumber, publication_date = $publicationDate, artist_id = $artistId, series_id = $seriesId WHERE id = $issueId';
        db.run(sql, {
          $name: updatedIssue.name,
          $issueNumber: updatedIssue.issueNumber,
          $publicationDate: updatedIssue.publicationDate,
          $artistId: updatedIssue.artistId,
          $seriesId: req.params.seriesId,
          $issueId: req.params.issueId
        }, function(error) {
          if (error) {
             res.status(500).send();
           } else {
             db.get('SELECT * FROM Issue WHERE id = $id', {
               $id: req.params.issueId
             }, function(error, row) {
               if (error || !row) {
                  res.status(500).send();
               } else {
                  res.status(200).send({issue: row});
               }
             })
          }
        })
      }
    }
  })
});

app.delete('/api/series/:seriesId/issues/:issueId', (req, res, next) => {
  //check if id exists
  db.get('SELECT * FROM Issue WHERE id = $issueId', {
    $issueId: req.params.issueId
  }, function(error, row) {
    if (error || !row) {
       res.status(404).send();
    } else {
          db.run('DELETE FROM Issue WHERE id = $id', {
            $id: req.params.issueId
          }, function(error) {
            if (error) {
              res.status(404).send()
            } else {
              res.status(204).send()
            }
          })
        }
      })
    })

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server is listening at PORT 4000");
});

module.exports = app;
