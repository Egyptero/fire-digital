const mongoose = require("mongoose");
const joi = require("joi");

module.exports.Message = mongoose.model(
  "message",
  new mongoose.Schema({
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant"
    },
    details: {
      type: Object,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now()
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation"
    },
    smoochConversationId: String,
    routing: {
      routed: {
        type: Boolean,
        default: false
      },
      timestamp: Date,
      url: String
    }
  })
);
module.exports.validate = message => {
  const schema = {
    tenantId: joi.string().min(5),
    details: joi.object().required(),
    smoochConversationId: joi.string(),
    routing: {
      routed: joi.boolean(),
      timestamp: joi.date(),
      url: joi.string()
    }
  };

  return joi.validate(message, schema);
};
