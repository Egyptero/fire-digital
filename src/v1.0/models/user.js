const mongoose = require("mongoose");
const joi = require("joi");

module.exports.User = mongoose.model(
  "user",
  new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    wa: {
      id: String,
      user: String
    },
    fb_id: String
  })
);

module.exports.validate = user => {
  const schema = {
    name: joi.string(),
    email: joi.string(),
    phone: joi.string(),
    wa: {
      id: joi.string(),
      user: joi.string()
    },
    fb_id: joi.string()
  };

  return joi.validate(user, schema);
};
