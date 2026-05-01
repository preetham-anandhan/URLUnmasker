const express = require("express");
const router = express.Router();

const { getDomainProfile } = require("../controllers/domainController");

router.get("/:domain", getDomainProfile);

module.exports = router;