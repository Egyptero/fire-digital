const express = require("express");
const router = express.Router();
const winston = require("winston");
const { Message, validate } = require("../../models/message");

router.get("/", async (req, res) => {
  winston.info("Getting all messages");
  const messages = await Message.find();
  return res.send(messages);
});

router.delete("/:id", async (req, res) => {
  if (req.params.id != 1) {
    const message = await Message.deleteOne({ _id: req.params.id });
    winston.info("Delete one message");
    return res.send(message);
  } else {
    const messages = await Message.deleteMany();
    winston.info("Delete all messages");
    return res.send(messages);
  }
});

module.exports = router;
