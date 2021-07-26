const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
  let statusCode = 500;
  let statusMessage = false;
  let message = "";
  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400;
      break;

    default:
      message = "Internal Server Error";
      break;
  }
  res.status(statusCode).json({ success: statusMessage });
});

module.exports = app;
