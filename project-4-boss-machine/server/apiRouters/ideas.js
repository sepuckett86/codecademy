const express = require('express');
const app = express();
const ideasRouter = express.Router();
// Load functions from db.js file
const { createMeeting,
getAllFromDatabase,
getFromDatabaseById,
addToDatabase,
updateInstanceInDatabase,
deleteFromDatabasebyId,
deleteAllFromDatabase } = require('../db');

// Get ideas data from database
let ideas = getAllFromDatabase('ideas');

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
  if (ideas !== null) {
    res.send(ideas);
  } else {
    res.status(404).send('Unable to retrieve ideas');
  }
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', (req, res, next) => {
  // Use req.body, not req.query, to find posted information. Because of bodyParser?
  const queryArguments = req.body;
  // Declare newIdea object. id is unnecessary because id is
  // assigned with addToDatabase function.
  const newIdea = {
      'name': queryArguments.name,
      'description': queryArguments.description,
      'numWeeks': queryArguments.numWeeks,
      'weeklyRevenue': queryArguments.weeklyRevenue
    };
  // Convert numWeeks and weeklyRevenue from a string to number
  newIdea.numWeeks = Number(newIdea.numWeeks);
  newIdea.weeklyRevenue = Number(newIdea.weeklyRevenue);
  // Check whether salary is a number (if it's not something like this: "aaa")
  if (typeof newIdea.numWeeks == 'number' && typeof newIdea.weeklyRevenue == 'number') {
    const addedIdeaWithId = addToDatabase('ideas', newIdea);
    res.status(201).send(addedIdeaWithId);
  } else {
    res.status(404).send('Invalid idea data')
  }

});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {

  let id = req.params.ideaId;
  // Get idea by id from idea array
  const foundIdea = ideas.find((idea) => {
    return idea.id === id;
  })
  if (foundIdea !== undefined) {
    res.send(foundIdea);
  } else {
    res.status(404).send('Idea does not exist');
  }
});


// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
  // Determine whether idea exists
  let id = req.params.ideaId;
  // Declare new idea data
  let newData = req.body;
  const foundIdea = getFromDatabaseById('ideas', id);
  if (foundIdea) {
    const updatedIdea = updateInstanceInDatabase('ideas', newData);
    if (updatedIdea) {
      res.send(updatedIdea);
    } else {
      res.status(404).send('Idea could not be updated');
    }
  } else {
    res.status(404).send('Idea does not exist');
  }
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
  // Determine whether idea exists
  let id = req.params.ideaId;
  const dataCheck = getFromDatabaseById('ideas', id);
  if (dataCheck !== -1) {
    const deleteCheck = deleteFromDatabasebyId('ideas', id);
    if (deleteCheck) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } else {
    res.status(404).send();
  }
})

module.exports = ideasRouter;
