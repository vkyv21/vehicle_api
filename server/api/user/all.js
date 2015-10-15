'use strict';
var model = require('../../models');
var User = model.User; // require user model
var response = require('../../components/response.js'); // require response js for setting headers variables
var userDto = require('../../dto/user.js'); // require User Data Transfer Object
var Q = require('q');
var Role = model.Role; // require roles model
var Circle = model.Circle; // require circles model
var Notification = model.Notification;
var School = model.School;
module.exports = function(req, res){
    // fetching list of all user
    User.findAll()
    .then(function(data){
        var arr = [];
        data.forEach(function(val){
            arr.push(userDto.marshal(val));
        });
        return Q.all(arr).then(function(user){
            if(user.length === 0){
                // if user not exists
                return response(res, null, "not found", 204);
            }
            return response(res, user, "data fetched", 200);

        });
    })
    .catch(function(err) {
        return response(res, err, err.message, 500);
    });
};
