const express = require("express");
const router = express.Router();
const winston = require("winston");
const { Tenant, validate } = require("../models/tenant");
router.post("/", async (req, res) => {
  winston.debug("Post new tenant data");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let tenant = await Tenant.findOne({ tenantId: req.body.tenantId });
  if (tenant)
    return res
      .status(400)
      .send("Same id already exist , please use update instead");
  tenant = new Tenant(req.body);
  await tenant.save();
  return res.send(tenant);
});
router.put("/:id", async (req, res) => {
  winston.debug("Update tenant data for id=>" + req.params.id);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  return res.send(tenant);
});
router.delete("/:id", async (req, res) => {
  winston.debug("Delete tenant data for id=>" + req.params.id);
  const tenant = await Tenant.findByIdAndDelete(req.params.id);
  return res.send(tenant);
});
router.get("/:id", async (req, res) => {
  winston.debug("Get tenant data for id=>" + req.params.id);
  const tenant = await Tenant.findById(req.params.id);
  return res.send(tenant);
});
module.exports = router;
