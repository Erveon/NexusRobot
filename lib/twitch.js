var config = require('./../config/config');
var cooldown = require("./utils/cooldown");
var tmi = require("tmi.js");

let Twitch = {};

var options = {
	options : {
		debug: true
	},
	connection : {
		cluster: "aws",
		reconnect: true
	},
	identity : {
		username: config.twitch.username,
		password: config.twitch.password
	},
	channels: config.twitch.channels
};

Twitch.connect = function() {
	Twitch.client = new tmi.client(options);
	Twitch.client.connect();
};

Twitch.sendMessage = function(message) {
	if(!cooldown.hasCooldown()) {
		Twitch.client.action("nexusgamingrl", message);
		cooldown.initiate();
	}
};

module.exports = Twitch;
