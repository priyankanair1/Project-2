const express = require("express");
const router = express.Router();

const categoriesCtrl = require("../controllers/categories");
const ensureLoggedIn = require('../config/ensureLoggedIn');	


router.get('/', ensureLoggedIn, categoriesCtrl.index);

router.post('/',ensureLoggedIn, categoriesCtrl.create);

module.exports = router;
