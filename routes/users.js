var express = require('express');
var router = express.Router();
var userCntlr = require('../controllers/user.controller');

/* GET users listing. */
router.post('/login', userCntlr.login)
router.post('/register', userCntlr.register);

module.exports = router;
