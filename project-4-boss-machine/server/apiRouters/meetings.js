const express = require('express');
const meetingsRouter = express.Router();

// Load functions from db.js file
const { createMeeting,
getAllFromDatabase,
getFromDatabaseById,
addToDatabase,
updateInstanceInDatabase,
deleteFromDatabasebyId,
deleteAllFromDatabase } = require('../db');

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
  let meetings = getAllFromDatabase('meetings');
  if (meetings) {
    res.send(meetings);
  } else {
    res.status(404).send();
  }
});

// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = createMeeting();
  if (newMeeting) {
    const newMeetingAdded = addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeetingAdded);
  } else {
    res.status(404).send();
  }
});

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next) => {
  const deleteCheck = deleteAllFromDatabase('meetings');
  if (deleteCheck) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
})

module.exports = meetingsRouter;
