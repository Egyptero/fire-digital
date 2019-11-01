const mongoose = require("mongoose");
const joi = require("joi");

module.exports.Logger = mongoose.model(
  "logger",
  new mongoose.Schema({
    message: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now()
    },
    details: Object
  })
);
module.exports.validate = log => {
  const schema = {
    message: joi.string().required(),
    date: joi.date(),
    details: joi.object()
  };
  return joi.validate(log, schema);
};
