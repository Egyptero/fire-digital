const winston = require("winston");
const { Logger, validate } = require("../models/logger");
module.exports = async log => {
  winston.debug("log =>" + log);
  const { error } = validate(log);
  if (error) return winston.error("Error saving log message => " + log);
  const logger = new Logger(log);
  await logger.save();
};
