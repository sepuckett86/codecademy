const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


// Begin db.serialize
db.serialize(function() {
db.run('DROP TABLE IF EXISTS Artist',
  error => {
  if (error) {
        throw error;
      }
});
db.run('DROP TABLE IF EXISTS Series',
  error => {
  if (error) {
        throw error;
      }
});
db.run('DROP TABLE IF EXISTS Issue',
  error => {
  if (error) {
        throw error;
      }
});
db.run('CREATE TABLE Artist (id INTEGER PRIMARY KEY, name TEXT NOT NULL, date_of_birth TEXT NOT NULL, biography TEXT NOT NULL, is_currently_employed INTEGER DEFAULT 1)',
  error => {
  if (error) {
    throw error;
  }
});

db.run('CREATE TABLE Series (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL)',
  error => {
  if (error) {
    throw error;
  }
});

db.run('CREATE TABLE Issue (id INTEGER PRIMARY KEY, name TEXT NOT NULL, issue_number TEXT NOT NULL, publication_date TEXT NOT NULL, artist_id INTEGER NOT NULL, series_id INTEGER NOT NULL, FOREIGN KEY(artist_id) REFERENCES Artist(id), FOREIGN KEY(series_id) REFERENCES Series(id))',
  error => {
  if (error) {
    throw error;
  }
});

});
// End db.serialize
