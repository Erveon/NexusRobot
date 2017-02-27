let twitch = require('./../twitch');
let commands = require('./../commands');
let config = require('./../../config/config');
let admins = config.twitch.admins;

var matchlink;
var matchcode;

//web
commands.create({
	name: "website",
	aliases: [ "site" ],
	command: function() {
		twitch.sendMessage("Visit us on the web @ https://gamingnex.us/");
	}
});

//discord
commands.create({
	name: "discord",
	command: function() {
		twitch.sendMessage("Join us on Discord @ https://discordapp.com/invite/UAQkEu9");
	}
});

//patreon
commands.create({
	name: "patreon",
	command: function() {
		twitch.sendMessage("Support us on Patreon @ http://patreon.com/nexusgaming");
	}
});

//twitter
commands.create({
	name: "twitter",
	aliases: [ "twit" ],
	command: function() {
		twitch.sendMessage("Follow us on Twitter @ http://twitter.com/nexusgamingrl");
	}
});

//matcherino
commands.create({
	name: "matcherino",
	command: function(command) {
		if (command.who.mod){
			if (command.params[0] === "set") {
				link = command.params[1];
				code = command.params[2];
			}
		}
		if (link === undefined || code === undefined){
			twitch.sendMessage("Please set matcherino link/code!")
		}
		else {
			twitch.sendMessage("Use coupon code '" + code + "' to donate a FREE dollar to the prize pool for this tournament @ https://matcherino.com/b/tournaments/" + link);
		}
	}
});

module.exports = {};
