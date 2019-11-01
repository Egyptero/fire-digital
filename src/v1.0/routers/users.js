const express = require("express");
const router = express.Router();
const winston = require("winston");
const { User } = require("../models/user");
const { Conversation } = require("../models/conversation");
const { Message } = require("../models/message");
const {
  smoochApp,
  smoochAccount,
  AppId
} = require("../functions/smoochConnection");
//Get all logs
router.get("/", async (req, res) => {
  winston.info("Get all users from the DB");
  const users = await User.find();
  return res.send(users);
});

router.get("/:id/conversations", async (req, res) => {
  winston.info("Get all conversations of certain user from the DB");
  const conversations = await Conversation.find({ userId: req.params.id });
  return res.send(conversations);
});

router.get("/:id/messages", async (req, res) => {
  winston.info("Get all messages of certain user from the DB");
  const conversations = await Conversation.find({ userId: req.params.id });
  let messages = [];
  for (let index = 0; index < conversations.length; index++) {
    const conversation = conversations[index];
    messages = messages.concat(
      await Message.find({ conversationId: conversation._id })
    );
  }
  return res.send(messages);
});

router.get("/:id/wab/conversations", async (req, res) => {
  winston.info("Get all WA conversations of certain user from the DB");
  const conversations = await Conversation.find({
    userId: req.params.id,
    type: "whatsapp"
  });
  return res.send(conversations);
});

router.get("/:id/wab/messages", async (req, res) => {
  winston.info("Get all WA messages of certain user from the DB");
  const conversations = await Conversation.find({
    userId: req.params.id,
    type: "whatsapp"
  });
  let messages = [];
  for (let index = 0; index < conversations.length; index++) {
    const conversation = conversations[index];
    messages = messages.concat(
      await Message.find({ conversationId: conversation._id })
    );
  }
  return res.send(messages);
});

router.delete("/:id", async (req, res) => {
  if (req.params.id != 1) {
    const user = await User.deleteOne({ _id: req.params.id });
    winston.info("Delete one user");
    return res.send(user);
  } else {
    const users = await User.deleteMany();
    winston.info("Delete all messages");
    return res.send(users);
  }
});

//Add user to app
router.post("/send", async (req, res) => {
  const message = await smoochAccount.appUsers.sendMessage({
    appId: AppId,
    userId: req.body.userWAId,
    message: {
      text: req.body.text,
      role: "appMaker",
      type: req.body.type
    }
  });
  return res.send(message);
});

router.post("/add", async (req, res) => {
  const user = await smoochApp.appUsers.create({
    appId: AppId,
    appUser: {
      userId: req.body.email,
      givenName: req.body.name
    }
  });
  return res.send(user);
});

router.post("/link", async (req, res) => {
  const link = await smoochApp.appUsers.linkChannel({
    appId: AppId,
    userId: req.body.email,
    data: {
      type: "whatsapp",
      phoneNumber: req.body.phone,
      confirmation: {
        type: "prompt"
      }
    }
  });
  return res.send(user);
});

router.get("/integrations/list", async (req, res) => {
  const integrations = await smoochAccount.integrations.list({
    appId: AppId
  });
  return res.send(integrations);
});

module.exports = router;
