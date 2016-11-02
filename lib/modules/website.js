let twitch = require('./../twitch');
let commands = require('./../commands');

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

module.exports = {};
