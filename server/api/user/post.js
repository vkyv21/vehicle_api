'use strict';
var model = require('../../models');
var User = model.User; // require user model
var response = require('../../components/response.js'); // require response js for setting headers variables
var userDto = require('../../dto/user.js'); // require User Data Transfer Object
var validator = require('validator');// require for put server side validations
var fs = require("fs");
var config = require('config');
var md5 = require('md5');
var Q =	require('q');
module.exports = function(req, res){
    // function for decode base64 image
    var filename = null;
    //validation for User Email
    if(!validator.isEmail(req.body.email))
    {
        return response(res, null, "invalid email", 422);
    }
    //validation for User name exists
    if(!validator.isLength(req.body.fname, 1))
    {
        return response(res, null, "invalid name", 422);
    }
    //validation for User name exists
    if(!validator.isLength(req.body.lname, 1))
    {
        return response(res, null, "invalid name", 422);
    }
    //validation for User password length shoulb be 6 or more
    if(!validator.isLength(req.body.password, 6))
    {
        return response(res, null, "invalid password", 422);
    }
    // creating new user
    User.create(userDto.unmarshal(req.body))
    .then(function(user){
            return response(res, user, "user created", 200);
        }).catch(function(err) {
            return response(res, err, err.message, 500);
        });
};
