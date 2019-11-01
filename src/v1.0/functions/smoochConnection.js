const Smooch = require("smooch-core");
const smoochApp = new Smooch({
  keyId: "app_5ca9d3d89005aa00104b96df",
  secret:
    "niEcnl9f_7K57I9keR3x11JnshrtjeDLcsJjaQ8IgkYHA8wmdh9y0QEVsOFJwxLJCWfl_Socdnjp_BjExAFjGQ",
  scope: "app"
});

const smoochAccount = new Smooch({
  keyId: "act_5ca9dfc185e38f0010ef5489",
  secret:
    "TavUsznyK_eTUS0usjD8Z6Nj3G4VEmX1Dx8l88Ohsc3k3EuecvuDkNNfooaahoWq2rI41Nxo0BQ-POL_Y8DIXw",
  scope: "account"
});

const appId = "5c186b88851ea100229fe9a7";

module.exports.smoochApp = smoochApp;
module.exports.smoochAccount = smoochAccount;
module.exports.AppId = appId;
