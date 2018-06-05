const express = require('express');
const employeesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

employeesRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Employee WHERE is_current_employee = 1', function(error, rows) {
    if (error) {
      res.status(404).send();
    } else {
      res.status(200).send({employees: rows});
    }
  })
});

employeesRouter.get('/:id', (req, res, next) => {
  db.get('SELECT * FROM Employee WHERE id = $id', {
    $id: req.params.id
  }, function(error, row) {
    if (error || !row) {
      res.status(404).send();
    } else {
      res.status(200).send({employee: row});
    }
  })
});

employeesRouter.post('/', (req, res, next) => {
  const newEmployee = req.body.employee;
  if (!newEmployee.name || !newEmployee.position || !newEmployee.wage) {
    res.status(400).send();
    return;
  } else {
  db.run('INSERT INTO Employee (name, position, wage) VALUES ($name, $position, $wage)', {
    $name: newEmployee.name,
    $position: newEmployee.position,
    $wage: newEmployee.wage
  }, function(error) {
    if (error) {
      res.status(404).send();
      return;
    } else {
      db.get('SELECT * FROM Employee WHERE Employee.id = $id', {
        $id: this.lastID
      }, function(error, row) {
        if (error) {
          res.status(404).send();
          return;
        } else {
          res.status(201).send({employee: row})
          return;
        }
      })
    }
  })
  }
});

employeesRouter.put('/:employeeId', (req, res, next) => {
  req.body.employee.isCurrentEmployee = req.body.employee.isCurrentEmployee === 0 ? 0 : 1;
  const updatedEmployee = req.body.employee;
  const id = req.params.employeeId;
  if(!updatedEmployee.name || !updatedEmployee.position || !updatedEmployee.wage || !updatedEmployee.name) {
    return res.status(400).send();
  }
  db.serialize(function() {
    db.run('UPDATE Employee SET name = $name WHERE id = $id', {
      $name: updatedEmployee.name,
      $id: id
    }, function(error) {
      if (error) {
        next(error);
        return;
      }
    });
    db.run('UPDATE Employee SET position = $position WHERE id = $id', {
      $position: updatedEmployee.position,
      $id: id
    }, function(error) {
      if (error) {
        next(error);
      }
    });
    db.run('UPDATE Employee SET wage = $wage WHERE id = $id', {
      $wage: updatedEmployee.wage,
      $id: id
    }, function(error) {
      if (error) {
        next(error);
      }
    });
    db.run('UPDATE Employee SET is_current_employee = $isCurrentEmployee WHERE id = $id', {
      $isCurrentEmployee: updatedEmployee.isCurrentEmployee,
      $id: id
    }, function(error) {
      if (error) {
        next(error);
      }
    });
    db.get('SELECT * FROM Employee WHERE id = $id', {
      $id: id
    }, function(error, row) {
      if (error) {
        res.status(404).send();
      } else {
        res.status(200).send({employee: row});
      }
    });
  });
});

employeesRouter.delete('/:employeeId', (req, res, next) => {
  const id = req.params.employeeId;
  db.run('UPDATE Employee SET is_current_employee = 0 WHERE Employee.id = $id', {
    $id: id
  }, function(error, row) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM Employee WHERE Employee.id = $id`, {
        $id: id
      },
        function(error, employee){
          res.status(200).send({employee: employee});
        });
    }
  })
})

employeesRouter.get('/:employeeId/timesheets', (req, res, next) => {
  const id = req.params.employeeId;
  db.get('SELECT * FROM Employee WHERE id = $id', {
    $id: id
  }, function(error, row) {
    if (error || !row) {
      res.status(404).send()
    } else {
      db.all('SELECT * FROM Timesheet WHERE employee_id = $id', {
        $id: id
      }, function(error, rows){
        if (error || !rows){
          res.status(404).send()
        } else {
          res.status(200).send({timesheets: rows})
        }
      })
    }
  })
})

employeesRouter.post('/:employeeId/timesheets', (req, res, next) => {
  const id = req.params.employeeId;
  const newTimesheet = req.body.timesheet;
  if (!newTimesheet.hours || !newTimesheet.rate || !newTimesheet.date) {
    res.status(400).send();
    return;
  } else {
      // Check if employee with the given id exisis
      db.get('SELECT * FROM Employee WHERE id = $id', {
        $id: id
      }, function(error, row) {
        if (error || !row) {
          res.status(404).send();
        } else {
          db.run('INSERT INTO Timesheet (hours, rate, date, employee_id) VALUES ($hours, $rate, $date, $employee_id)', {
            $hours: newTimesheet.hours,
            $rate: newTimesheet.rate,
            $date: newTimesheet.date,
            $employee_id: id
          }, function(error) {
            if (error) {
              res.status(404).send();
            } else {
              db.get('SELECT * FROM Timesheet WHERE Timesheet.id = $id', {
                $id: this.lastID
              }, function(error, row) {
                if (error) {
                  res.status(404).send();
                } else {
                  res.status(201).send({timesheet: row})
                }
              })
            }
          })
        }
      })
  }
})

employeesRouter.put('/:employeeId/timesheets/:timesheetId', (req, res, next) => {
  const updatedTimesheet = req.body.timesheet;
  const id = req.params.timesheetId;
  const employeeId = req.params.employeeId;
  // Check for timesheet id
  db.get('SELECT * FROM Timesheet WHERE id = $id', {
    $id: id
  }, function(error, row) {
    if (error || !row) {
      res.status(404).send();
    } else {
      // Check for valid updated timesheet info
      if(!updatedTimesheet.hours || !updatedTimesheet.rate || !updatedTimesheet.date) {
        return res.status(400).send();
      } else {
        // Check for employee id
        db.get('SELECT * FROM Employee WHERE Employee.id = $id', {
          $id: employeeId
        }, function(error, row){
          if (error || !row) {
            return res.status(404).send();
          } else {
            db.serialize(function() {
              db.run('UPDATE Timesheet SET hours = $hours WHERE id = $id', {
                $hours: updatedTimesheet.hours,
                $id: id
              }, function(error) {
                if (error) {
                  next(error);
                  return;
                }
              });
              db.run('UPDATE Timesheet SET rate = $rate WHERE id = $id', {
                $rate: updatedTimesheet.rate,
                $id: id
              }, function(error) {
                if (error) {
                  next(error);
                }
              });
              db.run('UPDATE Timesheet SET date = $date WHERE id = $id', {
                $date: updatedTimesheet.date,
                $id: id
              }, function(error) {
                if (error) {
                  next(error);
                }
              });
              db.run('UPDATE Timesheet SET employee_id = $employee_id WHERE id = $id', {
                $employee_id: employeeId,
                $id: id
              }, function(error) {
                if (error) {
                  next(error);
                }
              });
              db.get('SELECT * FROM Timesheet WHERE id = $id', {
                $id: id
              }, function(error, row) {
                if (error || !row) {
                  res.status(404).send();
                } else {
                  res.status(200).send({timesheet: row});
                }
              });
            });
          }
        }
        )
      }
    }
  })
});

employeesRouter.delete('/:employeeId/timesheets/:timesheetId', (req, res, next) => {
  const employeeId = req.params.employeeId;
  const timesheetId = req.params.timesheetId;
  db.get('SELECT * FROM Timesheet WHERE id = $id', {
    $id: timesheetId
  }, function(error, row) {
    if (error || !row) {
      return res.status(404).send();
    } else {
      db.run('DELETE FROM Timesheet WHERE Timesheet.id = $id', {
        $id: timesheetId
      }, function(error, row) {
        if (error) {
          next(error);
        } else {
          db.get(`SELECT * FROM Timesheet WHERE Timesheet.id = $id`, {
            $id: timesheetId
          },
            function(error, employee){
              if (!employee) {
                res.status(204).send();
              }
            });
        }
      })
    }
  })

})

module.exports = employeesRouter;
