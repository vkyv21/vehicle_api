'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";

var express = require("express");
var config = require("config");
var model = require('./models');
// Setup server
var app = express();


//config application
require('./config')(app);

//load routes
require('./routes')(app);
//load models
model.sequelize.sync({forced: true}).then(function(){
    console.log('Starting Server on http://localhost:9000/api/v1');

        var server = require("http").createServer(app);
        // Start server
        server.listen(config.get("server.port"), config.get("server.ip"), function () {
            console.log("Express server listening on " + config.get("server.port") + ", in " + app.get("env") + " mode");
        });
}).catch(function(err){
    console.log("error", err);
});
// Expose app
module.exports = app;
