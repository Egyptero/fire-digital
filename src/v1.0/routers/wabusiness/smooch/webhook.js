const express = require("express");
const router = express.Router();
const winston = require("winston");
const joi = require("joi");
const logMessage = require("../../../functions/logMessage");
const {
  Message,
  validate: validateMessage
} = require("../../../models/message");
const { User, validate: validateUser } = require("../../../models/user");
const {
  Conversation,
  validate: validateConversation
} = require("../../../models/conversation");

//Post new smooch webhook message.
/*
 Step 1 log message in logger.
 Step 2 save message in messages.
*/
router.post("/", async (req, res) => {
  winston.info(
    "Smooch sent us notification .. you may check logger for more details, body:" +
      JSON.stringify(req.body)
  );

  const { error } = validate(req.body);
  if (error) {
    winston.error(
      "Error in message format as the follwing :" + error.details[0].message
    );
    return res.status(404).send(error.details[0].message);
  }

  const log = {
    message: "smooch notification",
    details: {
      message: req.body
    }
  };
  await logMessage(log);
  //Step 1 check if user existing or not. // If no user , then create a new user. Outcome is userId
  //Step 2 check active WAB conversation. // If no conversation , then create a new conversation. Outcome is conversationId , should be routed to Genesys
  //Step 3 Save Message
  //Step 4 Creation routing request on open media.
  req.body.messages.forEach(async message => {
    let routeToCC = false;
    let user = await User.findOne({ wa: { id: req.body.appUser._id } });

    //Temp solution to replace the api message with whatsapp type till we have it differently.
    if (message.source.type === "api") message.source.type = "whatsapp";
    if (!user) {
      user = new User({
        phone: message.phone,
        name: message.name,
        wa: {
          id: req.body.appUser._id
        }
      });
      user = await user.save();
    }
    if (!user || !user._id)
      return res
        .status(404)
        .send(
          "Can not find user id .. almost it is not saved as it is not coming in the message"
        );
    //Now we have a saved user.
    let conversation = await Conversation.findOne({
      userId: user._id,
      type: message.source.type,
      status: "Active"
    });

    if (!conversation) {
      console.log(`No conversation found , will try to create one`);
      conversation = new Conversation({
        userId: user._id,
        type: message.source.type
      });
      conversation = await conversation.save();
      routeToCC = true;
    }
    if (!conversation || !conversation._id)
      return res
        .status(404)
        .send("Can not find conversation id .. almost it is not saved");

    //Now we have a saved conversation
    let msg = new Message({
      // tenantId: "Unknown",
      details: message,
      smoochConversationId: req.body.conversation._id,
      conversationId: conversation._id
    });
    msg = await msg.save();

    //Now we have a saved message
    if (routeToCC) {
      // Now we need to make a route request to contact center
    }
  });
  return res.status(200).send();
});

function validate(message) {
  const schema = {
    trigger: joi.string(),
    app: joi.object().required(),
    version: joi.string(),
    messages: joi.array().items({
      text: joi.string(),
      type: joi.string(),
      role: joi.string(),
      received: joi.date(),
      name: joi.string(),
      authorId: joi.string().required(),
      avatarUrl: joi.string(),
      _id: joi.string(),
      source: {
        type: joi.string(),
        integrationId: joi.string(),
        originalMessageId: joi.string(),
        originalMessageTimestamp: joi.date()
      }
    }),
    appUser: {
      _id: joi.string(),
      conversationStarted: joi.boolean()
    },
    conversation: {
      _id: joi.string()
    }
  };
  return joi.validate(message, schema);
}

module.exports = router;
