/**
 * Express configuration
 */

'use strict';
var express = require('express');
var cors = require('cors');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('config');
var session = require('express-session');
var SessionStore = require('express-mysql-session');
var mysql = require('mysql');


module.exports = function(app) {
    app.use(cors());
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        secret: config.session.secret,
        cookie: null,
        header: 'X-Session-Token',
        store: new SessionStore({
            //session driver
            sessionConstructor: session.Session,
            // expiration limit in milliseconds
            expiration: config.session.expiration || 1440000
        }, mysql.createConnection(config.db.uri)),
        resave: false,
        saveUninitialized: false
    }));
    app.use('/public', express.static('public'));
};
