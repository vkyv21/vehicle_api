'use strict';
var Q =	require('q');
var passwordHash = require('password-hash');
var config = require('config');
module.exports =
{
	marshal: function(usermodel)
	{
		var deferred = Q.defer();

			deferred.resolve({
				id: usermodel.id,
				fname: usermodel.fname,
				lname: usermodel.lname,
				email: usermodel.email,
				fb_id: usermodel.fb_id,
				gplus_id: usermodel.gplus_id,
				createdAt: usermodel.createdAt,
				updatedAt: usermodel.updatedAt,
			});


		return deferred.promise;
	},

	unmarshal: function(jsonData){

		return {
			fname: jsonData.fname,
			lname: jsonData.lname,
			email: jsonData.email,
			password: passwordHash.generate(jsonData.password)
		};

	}
};
