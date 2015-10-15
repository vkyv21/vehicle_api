'use strict';

/*
  Primary Route Loader

  It will load all the child routes by nested module approach
*/
module.exports = function(app){
app.use('/api', require('./v1'));
  //load routes
};
