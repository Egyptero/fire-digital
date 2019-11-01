const mongoose = require("mongoose");
const joi = require("joi");

module.exports.Conversation = mongoose.model(
  "conversation",
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    agentId: String,
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },
    type: {
      type: String,
      enum: ["whatsapp", "messagner"]
    }
  })
);

module.exports.validate = conversation => {
  const schema = {
    userId: joi.string().min(5),
    agentId: joi.string(),
    status: joi.string().valid(["Active", "Inactive"]),
    type: joi.string().valid(["WAB", "FBIM", "TWTDM"])
  };

  return joi.validate(conversation, schema);
};
