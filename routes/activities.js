const express = require("express");
const router = express.Router();

const activityCtrl = require("../controllers/activities");

router.get('/', activityCtrl.index);
module.exports = router;
