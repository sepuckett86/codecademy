const express = require('express');
const minionsRouter = express.Router();

// Load functions from db.js file
const { createMeeting,
getAllFromDatabase,
getFromDatabaseById,
addToDatabase,
updateInstanceInDatabase,
deleteFromDatabasebyId,
deleteAllFromDatabase } = require('../db');

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
      'title':  queryArguments.title,
      'salary':  queryArguments.salary,
      'weaknesses': queryArguments.weaknesses
    };
  // Convert salary from a string to number
  newMinion.salary = Number(newMinion.salary);
  // Check whether salary is a number (if it's not something like this: "aaa")
  if (typeof newMinion.salary == 'number') {
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

/* EXAMPLE
Get a single expression

expressionsRouter.get('/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

const getElementById = (id, elementList) => {
  return elementList.find((element) => {
    return element.id === Number(id);
  });
};
*/

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

/*
// Update an expression
expressionsRouter.put('/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

const getIndexById = (id, elementList) => {
  return elementList.findIndex((element) => {
    return element.id === Number(id);
  });
};

const updateElement = (id, queryArguments, elementList) => {
  const elementIndex = getIndexById(id, elementList);
  if (elementIndex === -1) {
    throw new Error('updateElement must be called with a valid id parameter');
  }
  if (queryArguments.id) {
    queryArguments.id = Number(queryArguments.id);
  }
  Object.assign(elementList[elementIndex], queryArguments);
  return elementList[elementIndex];
};
*/

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



module.exports = minionsRouter;
