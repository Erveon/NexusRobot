let twitch = require('./../twitch');
let commands = require('./../commands');
let config = require('./../../config/config');
let admins = config.twitch.admins;

var teamA;
var teamB;
var rosterA = [];
var rosterB = [];

//getteams
commands.create({
	name: "teams",
	command: function(command) {
		if (command.params[0] === "set" && command.who.mod){
			command.params.shift();
			var names = command.params.join(" ").split("|");
			if (names.length === 2){
				teamA = names[0].trim();
				teamB = names[1].trim();
			}
		}
		if (teamA && teamB){
			twitch.sendMessage(teamA + " vs. " + teamB);
		}
	}
});