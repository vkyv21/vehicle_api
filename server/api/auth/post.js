'use strict';
var model = require('../../models');
var User = model.User; // require circles model
var response = require('../../components/response.js'); // require response js for setting headers variables
var validator = require('validator');// require for put server side validations
var userDto = require('../../dto/user'); // require User Data Transfer Object
var passwordHash = require('password-hash');
var _ = require('lodash');
var auth = require('../../components/auth.js');
var Role = model.Role; // require roles model
var Circle = model.Circle; // require circles model
var Notification = model.Notification;
var School = model.School;
module.exports = function(req, res){
        //validation for username exists
        if(!validator.isEmail(req.body.username))
        {
            return response(res, null, 'invalid username', 422);
        }
        // check password is valid or not
        if(!validator.isLength(req.body.password, 6))
        {
            return response(res, null, 'invalid password', 422);
        }
        // creating new Circle
        User.find({
            where: {email: req.body.username},
            include: [Role, Circle, School, { model: Notification, where: {ReceiverId: req.params.id}, required: false}]
   
        })
        .then(function(data){
            if(_.isEmpty(data)){// if user not exists
                return response(res, null, "User does not exists", 204);
            }
            return userDto.marshal(data).then(function(user){

                if(user){
                    if(user.isActive){
                        if(passwordHash.verify(req.body.password, user.password)){
                            return auth.setToken(req, res, user, 'user logged in', 200);
                        }
                        else{
                            return response(res, null, 'wrong username and password', 401);
                        }
                    }
                    else{
                        return response(res, null, 'Your account is inactive. Please confirm your mail', 401);
                    }
                }else{
                    return response(res, null, 'Server Error', 401);
                }
            });

        })
        .catch(function(err) {
            return response(res, err, err.message, 500);
        });
};
