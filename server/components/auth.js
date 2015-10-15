'use strict';
var response = require('./response');
var config = require('config');
module.exports =
{
    setToken: function(req, res, data, msg, code){
        code = code || 200;
        req.session.uid = data.id;
        req.session.roleId = data.roleId;
        req.session.save(function(err){
            if(err){
                return response(res, err, err.message, 500);
            }
            else{
                return response(res, data, msg, code);
            }
        });

    },
    isLoggedIn: function(req, res, next){
        if(req.session.uid){
            next();
        }
        else{
            return response(res, null, "unautherised request", 401);
        }
    },
    logout: function(req, res){
        if(req.session.uid){
            req.session.destroy(function(err){
                if(err){
                    return response(res, err, err.message, 500);
                }else{
                    return response(res, null, "logged out", 200);
                }
            });
        }
        else{
            return response(res, null, "unautherised request", 401);
        }
    }
};
