const express = require("express");
const router = express.Router();

const activityCtrl = require("../controllers/activities");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/", ensureLoggedIn, activityCtrl.index);

router.get("/add", ensureLoggedIn, activityCtrl.add);

router.post("/", ensureLoggedIn, activityCtrl.create);

router.delete("/:id", ensureLoggedIn, activityCtrl.delete);

router.get("/:id/edit", ensureLoggedIn, activityCtrl.edit);

router.put("/:id", ensureLoggedIn, activityCtrl.update);

module.exports = router;
