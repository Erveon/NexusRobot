let twitch = require('./../twitch');
let commands = require('./../commands');

let casters = [];

//display current casters
commands.create({
	name: "casters",
	command: function(command) {
		if (command.params[0] === "set" && command.who.mod){
			command.params.shift();
			casters = command.params;
		}
		twitch.sendMessage("Current caster(s): " + casters.join(", "));
	}
});

module.exports = {};
