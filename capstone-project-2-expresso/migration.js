const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const space = ' ';

db.serialize(function(){
  db.run('DROP TABLE IF EXISTS Employee',
    function(error) {
      if (error) {
        throw error;
      }
  });
  db.run('DROP TABLE IF EXISTS Timesheet',
    function(error) {
      if (error) {
        throw error;
      }
  });
  db.run('DROP TABLE IF EXISTS Menu',
    function(error) {
      if (error) {
        throw error;
      }
  });
  db.run('DROP TABLE IF EXISTS MenuItem',
    function(error) {
      if (error) {
        throw error;
      }
  });

  db.run('CREATE TABLE Employee (id INTEGER PRIMARY KEY, name TEXT NOT NULL, position TEXT NOT NULL, wage INTEGER NOT NULL, is_current_employee INTEGER DEFAULT 1)',
    function(error) {
      if (error) {
        throw error;
      }
    })

  db.run('CREATE TABLE Timesheet (id INTEGER PRIMARY KEY, hours INTEGER NOT NULL, rate INTEGER NOT NULL, date INTEGER NOT NULL, employee_id INTEGER NOT NULL, FOREIGN KEY(employee_id) REFERENCES Employee(id))',
    function(error) {
      if (error) {
        throw error;
      }
  })
  db.run('CREATE TABLE Menu (id INTEGER PRIMARY KEY, title TEXT NOT NULL)',
    function(error) {
      if (error) {
        throw error;
      }
  })
  db.run('CREATE TABLE MenuItem (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT, inventory INTEGER NOT NULL, price INTEGER NOT NULL, menu_id INTEGER NOT NULL, FOREIGN KEY(menu_id) REFERENCES Menu(id))',
    function(error) {
      if (error) {
        throw error;
      }
  })

});
