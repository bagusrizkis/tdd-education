// doenv -> dev atau testing
const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
  let statusCode = 500;
  if (err.name == "SequelizeValidationError") {
    statusCode = 400;
  } else if (err.name == "notFound") statusCode = 400;
  res.status(statusCode).json({ error: err });
});

module.exports = app;
