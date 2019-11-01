const express = require("express");
const router = express.Router();
const winston = require("winston");
const logMessage = require("../../functions/logMessage");
const { Message, validate } = require("../../models/message");

router.get("/", async (req, res) => {
  winston.info("New Facebook verification request");

  if (req.param("hub.verify_token") === "47416f534ece0e0949418022bec519f3") {
    logMessage({
      message: "facebook verification request",
      details: {
        hub_mode: req.param("hub.mode"),
        hub_challenge: req.param("hub.challenge"),
        hub_verify_token: req.param("hub.verify_token")
      }
    });

    return res.send(req.param("hub.challenge"));
  } else return res.status(401).send();
});
router.post("/", async (req, res) => {
  logMessage({
    message: "facebook notification",
    details: {
      message: req.body
    }
  });
  const msg = {
    tenantId: "xxsxsxsx",
    details: req.body
  };
  const { error } = validate(message);
  if (error) return res.status(400).send(error.details[0].message);
  const message = new Message(msg);
  await message.save();
  return res.status(200).send();
});
module.exports = router;
