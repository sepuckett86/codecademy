const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(cors());
app.use(morgan());
app.use(bodyParser());


const PORT = process.env.PORT || 4000;

app.listen(PORT);

module.exports = app;
