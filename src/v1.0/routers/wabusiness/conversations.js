const express = require("express");
const router = express.Router();
const winston = require("winston");
const { Conversation } = require("../../models/conversation");
const { Message } = require("../../models/message");
const { User } = require("../../models/user");

router.get("/", async (req, res) => {
  winston.info("Getting all conversations");
  const conversations = await Conversation.find();
  return res.send(conversations);
});

router.get("/:id/messages", async (req, res) => {
  winston.info("Getting all messages of sepcific conversation");
  const messages = await Message.find({ conversationId: req.params.id });
  return res.send(messages);
});

router.get("/:id/messages/formatted", async (req, res) => {
  winston.info(
    "Getting all messages of sepcific conversation formatted as per the client"
  );
  const conversation = await Conversation.findById(req.params.id);
  const user = await User.findById(conversation.userId);
  const messages = await Message.find({ conversationId: req.params.id });
  let formattedMessages = [];
  messages.forEach(message => {
    let fromUser;
    let toUser;
    if (message.details.role === "appMaker") {
      fromUser = {
        UserName: "firemisc",
        UserID: message.details.authorId,
        UserPhone: "+14384763261",
        UserStatus: "Unknown",
        UserLastSeenTime: "00-00-0000 00:00"
      };
      toUser = {
        UserName: user.name,
        UserID: user.wa.id,
        UserPhone: "+201011222666",
        UserStatus: "Unknown",
        UserLastSeenTime: "00-00-0000 00:00"
      };
    } else {
      fromUser = {
        UserName: message.details.name,
        UserID: message.details.authorId,
        UserPhone: "+201011222666",
        UserStatus: "Unknown",
        UserLastSeenTime: "00-00-0000 00:00"
      };
      toUser = {
        UserName: "firemisc",
        UserID: "00uif6fr1fsyK3drJ0h7",
        UserPhone: "+14384763261",
        UserStatus: "Unknown",
        UserLastSeenTime: "00-00-0000 00:00"
      };
    }

    const correctedDate = message.details.received * 1000;

    const formattedMessage = {
      MessageID: message.details._id,
      MessageText: message.details.text,
      MediaURL: null,
      MessageSendDateTime: correctedDate,
      MessageDeliveryDateTime: correctedDate,
      MessageSeenDateTime: correctedDate,
      WAFromUser: fromUser,
      WAToUser: toUser,
      WAToGroup: null,
      StarredMessage: false,
      Seen: true,
      Delivered: true,
      Sent: true,
      FailToSend: false,
      MessageStatus: 0
    };
    formattedMessages.push(formattedMessage);
  });
  return res.send(formattedMessages);
});

router.delete("/:id", async (req, res) => {
  if (req.params.id != 1) {
    const conversation = await Conversation.deleteOne({ _id: req.params.id });
    winston.info("Delete one conversation");
    return res.send(conversation);
  } else {
    const conversations = await Conversation.deleteMany();
    winston.info("Delete all conversations");
    return res.send(conversations);
  }
});

module.exports = router;
