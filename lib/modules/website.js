let twitch = require('./../twitch');
let commands = require('./../commands');
let config = require('./../../config/config');
let admins = config.twitch.admins;

var link;
var code;

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
		var suppress = command.tag==="s" ? true : false;
		if (command.who.mod){
			if (command.params[0] === "set") {
				if (command.params[1]!==undefined){
					link = command.params[1];
					if (command.params[2]!==undefined){
						code = command.params[2];
					}
					else {
						code = undefined;
					}
				}
				else {
					link = undefined;
					code = undefined;
				}
			}
		}
		if (!suppress){
			if (link === undefined){
				twitch.sendMessage("Please set matcherino link/code!")
			}
			else if (code === undefined){
				twitch.sendMessage("Donate to this tournament's prize pool @ https://matcherino.com/b/tournaments/" + link);	
			}
			else {
				twitch.sendMessage("Use coupon code '" + code + "' to donate a FREE dollar to the prize pool for this tournament @ https://matcherino.com/b/tournaments/" + link);
			}
		}
	}
});

module.exports = {};
