const express = require("express");
const router = express.Router();
const winston = require("winston");
const { Logger, validate } = require("../models/logger");
//Get all logs
router.get("/", async (req, res) => {
  winston.info("Get all log messages from the DB");
  const logs = await Logger.find();
  return res.send(logs);
});
module.exports = router;
