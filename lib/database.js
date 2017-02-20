var mysql = require('mysql');
var config = require('./../config/config');

var con = mysql.createPool({
	connectionLimit: 10,
	host: config.database.HOST,
	user: config.database.USER,
	password: config.database.PASSWORD,
	database: config.database.DATABASE
});

var sqlGet = "SELECT username, SUM(count) as count FROM nude_counter GROUP BY username WITH ROLLUP";
var sqlGetUser;
var sqlCheckUser;
var sqlCreateUser;
var userExists;

exports.getNudes = function(callback) {
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlGet, function(err,res) {
			if (err) throw err;
			callback(res[res.length-1].count);
			connection.release();
		});
	});
}

exports.getMyNudes = function(user, callback) {
	var sqlGetUser = "SELECT username,count FROM nude_counter WHERE username= ?";
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlGetUser,[user], function(err,res) {
			if (err) throw err;
			callback(res[0].count);
			connection.release();
		});
	});
}

exports.incNudes = function(user, callback) {
	var sqlInc = "UPDATE nude_counter SET count = count + 1 WHERE username = ?";
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlInc,[user], function(err, res) {
			if (err) throw err;
			if (callback !== undefined) callback();
			connection.release();
		});
	});
}

exports.checkUser = function(user, callback) {
	var sqlCheckUser = "SELECT * FROM nude_counter WHERE username= ?";
	userExists = false;
	con.getConnection(function(err, connection) {
		if (err) throw err;
		connection.query(sqlCheckUser,[user], function(err, res) {
			if (err) throw err;
			if (res.length === 1) userExists = true;
			if (callback !== undefined) callback();
			connection.release();
		});
	});
}


exports.createUser = function(user, callback) {
	if (!userExists){
		var sqlCreateUser = "INSERT INTO nude_counter VALUES (?,0)";
		con.getConnection(function(err, connection) {
			if (err) throw err;
			connection.query(sqlCreateUser,[user], function(err, res) {
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
	var sqlGetMaster = "SELECT username, count FROM nude_counter WHERE count=(SELECT MAX(count) FROM nude_counter)";
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlGetMaster, function(err, res) {
			if (err) throw err;
			callback(res);
			connection.release();
		});
	});
}