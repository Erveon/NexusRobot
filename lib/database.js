var mysql = require('mysql');
var config = require('./../config/config');

var con = mysql.createPool({
	connectionLimit: 10,
	host: config.database.HOST,
	user: config.database.USER,
	password: config.database.PASSWORD,
	database: config.database.DATABASE
});

//nudes
var sqlNudesCheckUser;
var sqlNudesUserExists;
var sqlNudesCreateUser;

var sqlNudesGetUser;
var sqlNudesIncUser;

var sqlNudesGet;
var sqlNudesGetMaster;

//commands
var sqlCommandCheck;
var sqlCommandExists;
var sqlCommandCreate;
var sqlCommandUpdate;

var sqlCommandGet;
var sqlCommandRemove;


//NUDES-----------------------------------------------------------------------------------------------------------
exports.getNudes = function(callback) {
	var sqlNudesGet = "SELECT username, SUM(count) as count FROM nude_counter GROUP BY username WITH ROLLUP";
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlNudesGet, function(err,res) {
			if (err) throw err;
			callback(res[res.length-1].count);
			connection.release();
		});
	});
}

exports.getMyNudes = function(user, callback) {
	var sqlNudesGetUser = "SELECT username,count FROM nude_counter WHERE username= ?";
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlNudesGetUser,[user], function(err,res) {
			if (err) throw err;
			callback(res[0].count);
			connection.release();
		});
	});
}

exports.incNudes = function(user, callback) {
	var sqlNudesIncUser = "UPDATE nude_counter SET count = count + 1 WHERE username = ?";
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlNudesIncUser,[user], function(err, res) {
			if (err) throw err;
			if (callback !== undefined) callback();
			connection.release();
		});
	});
}

exports.checkUser = function(user, callback) {
	var sqlNudesCheckUser = "SELECT * FROM nude_counter WHERE username= ?";
	sqlNudesUserExists = false;
	con.getConnection(function(err, connection) {
		if (err) throw err;
		connection.query(sqlNudesCheckUser,[user], function(err, res) {
			if (err) throw err;
			if (res.length === 1) sqlNudesUserExists = true;
			if (callback !== undefined) callback();
			connection.release();
		});
	});
}


exports.createUser = function(user, callback) {
	if (!sqlNudesUserExists){
		var sqlNudesCreateUser = "INSERT INTO nude_counter VALUES (?,0)";
		con.getConnection(function(err, connection) {
			if (err) throw err;
			connection.query(sqlNudesCreateUser,[user], function(err, res) {
				if (err) throw err;
				if (callback !== undefined) callback();
				connection.release();
			});
		});		
	}
	else {
		callback();	
	}
}

exports.getMaster = function(callback){
	var sqlNudesGetMaster = "SELECT username, count FROM nude_counter WHERE count=(SELECT MAX(count) FROM nude_counter)";
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlGetNudesMaster, function(err, res) {
			if (err) throw err;
			callback(res);
			connection.release();
		});
	});
}
//----------------------------------------------------------------------------------------------------------------

//CUSTOM COMMANDS-------------------------------------------------------------------------------------------------
exports.getCommand = function(commandkey, callback) {
	var sqlCommandGet = "SELECT command_output FROM custom_commands WHERE command_name= ?"; //fill sql statement
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlCommandGet,[commandkey], function(err,res) {
			if (err) throw err;
			callback(res[0].command_output);
			connection.release();
		});
	});
}

exports.checkCommand = function(commandkey, callback){
	var sqlCommandCheck = "SELECT * FROM custom_commands WHERE command_name= ?";
	sqlCommandExists = false;
	con.getConnection(function(err, connection) {
		if (err) throw err;
		connection.query(sqlCommandCheck,[commandkey], function(err, res) {
			if (err) throw err;
			if (res.length === 1) sqlCommandExists = true;
			if (callback !== undefined) callback(sqlCommandExists);
			connection.release();
		});
	});	
}

exports.createCommand = function(commandkey, commandvalue, callback){
	if (!sqlCommandExists){
		var sqlCommandCreate = "INSERT INTO custom_commands VALUES (?,?)"; //fill sql statement
		con.getConnection(function(err, connection){
			if (err) throw err;
			connection.query(sqlCommandCreate,[commandkey,commandvalue], function(err, res){
				if (err) throw err;
				if (callback !== undefined) callback();
				connection.release();
			});
		});
	}
	else {
		callback();
	}
}

exports.updateCommand = function(commandkey, commandvalue, callback) {
	if (sqlCommandExists){
		var sqlCommandUpdate = "UPDATE custom_commands SET command_output=? WHERE command_name= ?";
		con.getConnection(function(err, connection) {
			if(err) throw err;
			connection.query(sqlCommandUpdate,[commandvalue,commandkey], function(err, res) {
				if (err) throw err;
				if (callback !== undefined) callback(sqlCommandExists);
				connection.release();
			});
		});		
	}
	else {
		callback(sqlCommandExists);
	}

}

exports.removeCommand = function(commandkey, callback){
	if (sqlCommandExists) {
		var sqlCommandRemove = "DELETE FROM custom_commands WHERE command_name= ?"; //fill sql statement
		con.getConnection(function(err, connection){
			if (err) throw err;
			connection.query(sqlCommandRemove,[commandkey], function(err, res){
				if (err) throw err;
				if (callback !== undefined) callback();
				connection.release();
			});
		});
	}
	else {
		callback();
	}

}

exports.loadCommands = function(callback){

}
//----------------------------------------------------------------------------------------------------------------