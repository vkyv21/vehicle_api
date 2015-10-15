'use strict';
var express = require('express');
var router = express.Router();
var logout = require('../../components/auth').logout;
// Routes for Circle
router
.post('/', require('./post'))
.delete('/', logout);

module.exports = router;
