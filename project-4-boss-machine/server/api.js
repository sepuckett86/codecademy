const express = require('express');
const apiRouter = express.Router();

// Mount your apiRouters below at the '/api' path.
const ideasRouter = require('./apiRouters/ideas.js');
const meetingsRouter = require('./apiRouters/meetings.js');
const minionsRouter = require('./apiRouters/minions.js');


apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/minions', minionsRouter);



module.exports = apiRouter;
