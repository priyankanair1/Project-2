const express = require("express");
const router = express.Router();

const activityCtrl = require("../controllers/activities");
const ensureLoggedIn = require('../config/ensureLoggedIn');	


router.get('/', ensureLoggedIn, activityCtrl.index);
router.get('/add',ensureLoggedIn, activityCtrl.add);
router.post('/',ensureLoggedIn, activityCtrl.create);
module.exports = router;
