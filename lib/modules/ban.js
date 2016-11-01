let twitch = require('./../twitch');
let commands = require('./../commands');

commands.create({
	name: "ban",
	mod: true,
	command: function(command) {
		twitch.sendMessage(command.params.join(" ") + " has been banned!");
	}
});

module.exports = {};
