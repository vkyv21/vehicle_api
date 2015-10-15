'use strict';
var model = require('../../models');
var User = model.User; // require user model
var Role = model.Role; // require roles model
var Circle = model.Circle; // require circles model
var Notification = model.Notification;
var School = model.School;
var response = require('../../components/response'); // require response js for setting headers variables
var userDto = require('../../dto/user'); // require User Data Transfer Object
var validator = require('validator');// require for put server side validations
var _ = require('lodash');
module.exports = function(req, res){
  //validation for User Id
  if(!validator.isNumeric(req.params.id))
  {
    return response(res, null, "invalid Id", 422);
  }
  // fetching data for user by his id
  User.find({
     where: {id: req.params.id}
  })
    .then(function(data){
        if(_.isEmpty(data)){// if user not exists
            return response(res, null, "not found", 204);
        }
        return userDto.marshal(data).then(function(user){
            return response(res, user, "data fetched", 200);
        });
    })
    .catch(function(err) {
        return response(res, err, "failed", 500);
    });
};
