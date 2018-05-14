const express = require('express');
const minionsRouter = express.Router();

// Load functions from db.js file
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase
} = require('../db');

// Get minion data from database
let minions = getAllFromDatabase('minions');

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
  if (minions !== null) {
    res.send(minions);
  } else {
    res.status(404).send('Unable to retrieve minions');
  }
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
  // Use req.body, not req.query, to find posted information. Because of bodyParser?
  const queryArguments = req.body;
  // Declare newMinion object. id is unnecessary because id is
  // assigned with addToDatabase function.
  const newMinion = {
    'name': queryArguments.name,
    'title': queryArguments.title,
    'salary': queryArguments.salary,
    'weaknesses': queryArguments.weaknesses
  };
  // Convert salary from a string to number
  newMinion.salary = Number(newMinion.salary);
  // Check whether salary is a number (if it's not something like this: "aaa")
  if (typeof newMinion.salary === 'number') {
    const addedMinionWithId = addToDatabase('minions', newMinion);
    res.status(201).send(addedMinionWithId);
  } else {
    res.status(404).send('Invalid minion data')
  }

});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
  let id = req.params.minionId;
  // Get minion by id from minion array
  const foundMinion = minions.find((minion) => {
    return minion.id === id;
  })
  if (foundMinion !== undefined) {
    res.send(foundMinion);
  } else {
    res.status(404).send('Minion does not exist');
  }
});

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
  // Determine whether minion exists
  let id = req.params.minionId;
  // Declare new minion data
  let newData = req.body;
  const foundMinion = getFromDatabaseById('minions', id);
  if (foundMinion) {
    const updatedMinion = updateInstanceInDatabase('minions', newData);
    if (updatedMinion) {
      res.send(updatedMinion);
    } else {
      res.status(404).send('Minion could not be updated');
    }
  } else {
    res.status(404).send('Minion does not exist');
  }
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
  // Determine whether minion exists
  let id = req.params.minionId;
  const dataCheck = getFromDatabaseById('minions', id);
  if (dataCheck !== -1) {
    const deleteCheck = deleteFromDatabasebyId('minions', id);
    if (deleteCheck) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } else {
    res.status(404).send();
  }
})

// BONUS

// Middleware to check whether minion is valid by ID
minionsRouter.use([
  '/:minionId/work', '/:minionId/work/:workID'
], (req, res, next) => {
  const minionId = Number(req.params.minionId);
  // Check if minionId is a number
  if (typeof minionId === 'number') {
    // Check if minion in database
    const foundMinion = minions.find((minion) => {
      return minion.id === String(minionId);
    })
    if (foundMinion !== undefined) {
      next();
    } else {
      res.status(404).send('Minion does not exist');
    }
  } else {
    res.status(404).send('Minion ID not valid');
  }
});

// GET /api/minions/:minionId/work to get an array of all work for the specified minon.
minionsRouter.get('/:minionId/work', (req, res, next) => {
  const minionId = req.params.minionId;
  const allWork = getAllFromDatabase('work');
  const minionWork = [];
  allWork.forEach(work => {
    if (work.minionId === minionId) {
      minionWork.push(work);
    }
  })
  if (minionWork) {
    res.send(minionWork);
  } else {
    res.status(404).send('No work');
  }
})

// POST /api/minions/:minionId/work to create a new work object and save it to the database.
minionsRouter.post('/:minionId/work', (req, res, next) => {
  const newWork = req.body;
  const newWorkAdded = addToDatabase('work', newWork);
  if (newWorkAdded) {
    res.send(newWorkAdded);
  } else {
    res.status(404).send();
  }
})

// PUT /api/minions/:minionId/work/:workId to update a single work by id.
minionsRouter.put('/:minionId/work/:wordId', (req, res, next) => {
  const updatedWork = req.body;
  // Check if minionID is valid
  const minionIds = [];
  minions.forEach(minion => {
    minionIds.push(minion.id)
  })
  if (!updatedWork.minionId) {
    res.status(404).send("Minion ID not valid");
  }
  // Check if minonID corresponding to workID is correct
  const allWork = getAllFromDatabase('work');
  allWork.forEach(work => {
    if (work.id === updatedWork.id) {
      if (work.minionId !== updatedWork.minionId) {
        res.status(400).send("Wrong minion ID");
      } else {
        const updateCheck = updateInstanceInDatabase('work', updatedWork);
        if (updateCheck) {
          res.send(updateCheck);
        } else {
          res.status(404).send();
        }
      }
    }
  })
})

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const workId = req.params.workId;
  const deleteCheck = deleteFromDatabasebyId('work', workId);
  if (deleteCheck) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
})

module.exports = minionsRouter;
