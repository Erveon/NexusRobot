let twitch = require('./../twitch');
let commands = require('./../commands');

//help
commands.create({
	name: "help",
	aliases: [ "halp" ],
	command: function() {
		twitch.sendMessage("User commands: !signup, !signuplist, !bracket, !website, !twitter, !matcherino, !patreon, !discord");
	}
});