'use strict';
  var express = require('express');
  var router = express.Router();
  var config = require('config');
  var auth = require('../../components/auth');
  router
  // for all user
  .get('/', auth.isLoggedIn, require('./all'))
  //get single user data
  .get('/:id', auth.isLoggedIn, require('./get'))
  // add new user data
  .post('/', require('./post'))
  // update user data
  .put('/:id', auth.isLoggedIn, require('./put'))
  // delete user data
  .delete('/:id', auth.isLoggedIn, require('./delete'));

  module.exports = router;
