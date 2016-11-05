var mysql = require('mysql');
var config = require('./../config/config');

var con = mysql.createPool({
	connectionLimit: 10,
	host: config.database.HOST,
	user: config.database.USER,
	password: config.database.PASSWORD,
	database: config.database.DATABASE
});

var sqlGet = "SELECT username, SUM(count) as count FROM command_counter_v2 GROUP BY username WITH ROLLUP";
var sqlGetUser;
var sqlCheckUser;
var sqlCreateUser;
var userExists = false;

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
	var sqlGetUser = "SELECT username,count FROM command_counter_v2 WHERE username='" + user + "'";
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlGetUser, function(err,res) {
			if (err) throw err;
			console.log(res[0]);
			callback(res[0].count);
			connection.release();
		});
	});
}

exports.incNudes = function(user, callback) {
	var sqlInc = "UPDATE command_counter_v2 SET count = count + 1 WHERE username = '" + user + "'";
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlInc, function(err, res) {
			if (err) throw err;
			if (callback !== undefined) callback();
			connection.release();
		});
	});
}

exports.checkUser = function(user, callback) {
	var sqlCheckUser = "SELECT * FROM command_counter_v2 WHERE username='" + user + "'";
	con.getConnection(function(err, connection) {
		if (err) throw err;
		connection.query(sqlCheckUser, function(err, res) {
			if (err) throw err;
			if (res.length === 1) userExists = true;
			if (callback !== undefined) callback();
			connection.release();
		});
	});
}


exports.createUser = function(user, callback) {
	if (!userExists){
		var sqlCreateUser = "INSERT INTO command_counter_v2 VALUES ('" + user + "',0)";
		con.getConnection(function(err, connection) {
			if (err) throw err;
			connection.query(sqlCreateUser, function(err, res) {
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