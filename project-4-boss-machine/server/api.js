const express = require('express');
const app = express();
const apiRouter = express.Router();

// Mount your apiRouters below at the '/api' path.
const ideasRouter = require('./apiRouters/ideas');
const meetingsRouter = require('./apiRouters/meetings');
const minionsRouter = require('./apiRouters/minions');


app.use('/ideas', ideasRouter);
app.use('/meetings', meetingsRouter);
app.use('/minions', minionsRouter);



module.exports = apiRouter;
