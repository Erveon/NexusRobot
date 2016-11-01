var mysql = require('mysql');
var config = require('./../config/config');

var con = mysql.createPool({
	connectionLimit: 10,
	host: config.database.HOST,
	user: config.database.USER,
	password: config.database.PASSWORD,
	database: config.database.DATABASE
});

var sqlGet = "SELECT count FROM command_counter WHERE command = 'nudes'";
var sqlInc = "UPDATE command_counter SET count = count + 1 WHERE command = 'nudes'";

exports.getNudes = function(callback) {
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlGet, function(err,res) {
			if (err) throw err;
			callback(res[0].count);
			connection.release();
		});
	});
}

exports.incNudes = function(callback) {
	con.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(sqlInc, function(err, res) {
			if (err) throw err;
			if (callback !== undefined) callback();
			connection.release();
		});
	});
}
