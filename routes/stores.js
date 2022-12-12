var express = require('express');
var router = express.Router();
const storeCtrl = require("../controllers/stores");
const isLoggedIn = require('../config/auth');

router.get('/new', isLoggedIn, storeCtrl.new);
router.get('/', storeCtrl.index);
router.post('/', isLoggedIn, storeCtrl.create);
router.get('/:id', storeCtrl.show);

module.exports = router;