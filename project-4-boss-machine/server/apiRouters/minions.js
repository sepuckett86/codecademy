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



minionsRouter.get('/', (req, res, next) => {
  let minions = getAllFromDatabase('minions');
  if (minions !== null) {
    res.send(minions);
  } else {
    res.status(404).send('Unable to retrieve minions');
  }
});

minionsRouter.post('/', (req, res, next) => {
  // Use req.body, not req.query, to find posted information. Because of bodyParser?
  const queryArguments = req.body;
  // Declare newMinion object. id is unnecessary because id is
  // assigned with addToDatabase function.
  const newMinion = {
      'id': '121',
      'name': queryArguments.name,
      'title':  queryArguments.title,
      'salary':  queryArguments.salary,
      'weaknesses': queryArguments.weaknesses
    };
  // Convert salary from a string to number
  newMinion.salary = Number(newMinion.salary);
  // Check whether salary is a number (if it's not something like this: "aaa")
  if (typeof newMinion.salary == 'number') {
    console.log(newMinion);
    const addedMinion = addToDatabase('minions', newMinion);
    console.log(addedMinion);
    res.status(201).send(addedMinion);
  } else {
    res.status(404).send('Invalid minion data')
  }

});


module.exports = minionsRouter;
