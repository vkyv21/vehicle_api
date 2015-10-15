"use strict";
module.exports = function(sequilize, DataType)
{
	return sequilize.define('User',
	{
			id:
			{
				type: DataType.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			fname:
			{
				type: DataType.STRING
			},
			lname:
			{
				type: DataType.STRING
			},
			fb_id:{
				type: DataType.STRING,
				unique: true
			},
			gplus_id:{
				type: DataType.STRING,
				unique: true
			},
			email:
			{
				type: DataType.STRING,
				unique: true
			},
			password:
			{
				type: DataType.STRING
			}
  });
};
