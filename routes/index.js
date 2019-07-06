var express = require('express');
var router = express.Router();
var userCntrl = require('../controllers/user.controller');
var requireLogin = require('../auth');
var io = require('../socket');

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', requireLogin, userCntrl.list);

router.get('/logout',function(req, res, next){
  let user = req.session.user;
  req.session.destroy(function(err){
      if(err){
          next(err);
      } else {
          io.emit('user-logout', user);
          res.redirect('/');
      }
  });
});

module.exports = router;
