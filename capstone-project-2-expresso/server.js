const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser());

const PORT = process.env.PORT || 4000;

app.listen(PORT);

module.exports = app;
