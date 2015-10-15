'use strict';
var model = require('../../models');
var User = model.User; // require user model
var response = require('../../components/response.js'); // require response js for setting headers variables
var Q =	require('q');
var validator = require('validator');// require for put server side validations
var fs = require("fs");
var config = require('config');
var md5 = require('md5');
var _ = require('lodash');
var passwordHash = require('password-hash');
module.exports = function(req, res){
    // function for decode base64 image
    var filename = null;
    var lastImage = null;
    var updateQuery = {};
    //validation for User Email
    if(req.body.email)
    {
        if(!validator.isEmail(req.body.email)){
            return response(res, null, "invalid email", 422);
        }else{
            updateQuery.email = req.body.email;
        }
    }
    //validation for User name exists
    if(req.body.fname)
    {
        if(!validator.isLength(req.body.fname, 1))
        {
            return response(res, null, "invalid name", 422);
        }else{
            updateQuery.fname = req.body.fname;
        }
    }
    if(req.body.lname)
    {
        if(!validator.isLength(req.body.lname, 1))
        {
            return response(res, null, "invalid name", 422);
        }else{
            updateQuery.lname = req.body.lname;
        }
    }
    //validation for User password length shoulb be 6 or more
    if(req.body.password){
        if(!validator.isLength(req.body.password, 6))
        {
            return response(res, null, "invalid password", 422);
        }else{
            updateQuery.password = passwordHash.generate(req.body.password);
        }
    }
        // search user by id
        User.find({ where: {id: req.params.id} })
        .then(function(user) {
            // update user profile
                return user.updateAttributes(updateQuery)
                .then(function(data){
                    return response(res, data, "user updated", 200);
                })
        }).catch(function(err) {
            return response(res, err, err.message, 500);
        });
};
