const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(bodyParser());
app.use(morgan('dev'));
app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

app.get('/', function (req, res) {
  res.send('Hello World!')
});


app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
module.exports = app;
