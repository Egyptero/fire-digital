const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Twitter webhook API");
});
module.exports = router;
