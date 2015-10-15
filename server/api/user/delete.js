'use strict';
var model = require('../../models');
var User = model.User; // require user model
var response = require('../../components/response.js'); // require response js for setting headers variables
var validator = require('validator');// require for put server side validations

module.exports = function(req, res){
    //validation for User Id
  if(!validator.isNumeric(req.params.id))
  {
     return response(res, null, "invalid Id", 422);
  }
  // find user by id
  User.destroy({ where: {id: req.params.id} })
    .then(function() {
            return response(res, null, "deleted", 200);

    }).catch(function(err){
        return response(res, err, err.message, 200);
    });
};
