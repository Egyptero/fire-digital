const express = require("express");
const cors = require("../middleware/cors");
const helmet = require("helmet");
module.exports = function(app) {
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors);
};
