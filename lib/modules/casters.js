let commands = require('./../commands');
let twitch = require('./../twitch')

let casters = [];

//Set current casters !setcasters <caster1> <caster2>
commands.create({
	name: "setcasters",
	admin: true,
	command: function(command) {
		casters = command.params;
	}
});

//display current casters
commands.create({
	name: "casters",
	command: function(command) {
		twitch.sendMessage("Current caster(s): " + casters.join(", "));
	}
});

module.exports = {};
