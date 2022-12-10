var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth')


router.get('/', function(req, res) {
    res.render('stores/index.ejs');
});



module.exports = router;