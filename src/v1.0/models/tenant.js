const mongoose = require("mongoose");
const joi = require("joi");

module.exports.Tenant = mongoose.model(
  "tenant",
  new mongoose.Schema({
    tenantId: {
      type: mongoose.Schema.Types.ObjectId
    },
    details: {
      type: Object,
      required: true
    }
  })
);

module.exports.validate = tenant => {
  const schema = {
    tenantId: joi.string(),
    details: joi.object().required()
  };

  return joi.validate(tenant, schema);
};
