const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server is listening at PORT 4000");
});
