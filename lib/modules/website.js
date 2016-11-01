let twitch = require('./../twitch');
let commands = require('./../commands');

commands.create({
	name: "website",
	aliases: [ "site" ],
	command: function() {
		twitch.sendMessage("Visit us on the web @ https://gamingnex.us/");
	}
});

module.exports = {};
