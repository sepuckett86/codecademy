const express = require('express');
const apiRouter = express.Router();

// Mount your apiRouters below at the '/api' path.
const employeesRouter = require('./apiRouters/employees.js');
const menusRouter = require('./apiRouters/menus.js');

apiRouter.use('/employees', employeesRouter);
apiRouter.use('/menus', menusRouter);

module.exports = apiRouter;
