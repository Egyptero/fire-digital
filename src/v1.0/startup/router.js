const facebookWebhook = require("../routers/facebook/webhook");
const twitterWebhook = require("../routers/twitter/webhook");
const waBusinessWebhook = require("../routers/wabusiness/smooch/webhook");
const waConversations = require("../routers/wabusiness/conversations");
const waMessages = require("../routers/wabusiness/messages");
const tenants = require("../routers/tenants");
const logs = require("../routers/logs");
const users = require("../routers/users");

module.exports = app => {
  app.use("/api/ver1.0/digital/facebook/webhook", facebookWebhook);
  app.use("/api/ver1.0/digital/twitter/webhook", twitterWebhook);
  app.use("/api/ver1.0/digital/wab/sch/webhook", waBusinessWebhook);
  app.use("/api/ver1.0/digital/wab/conversation", waConversations);
  app.use("/api/ver1.0/digital/wab/message", waMessages);
  app.use("/api/ver1.0/digital/tenant", tenants);
  app.use("/api/ver1.0/digital/log", logs);
  app.use("/api/ver1.0/digital/user", users);
};
