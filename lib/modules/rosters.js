let twitch = require('./../twitch');
let commands = require('./../commands');

var teamA;
var teamB;

var rosterA = [];
var rosterB = [];

//setteams
commands.create({
	name: "setteams",
	admin: true,
	command: function(command) {
		var names = command.params.join(" ").split(",");
		if (names.length === 2){
			teamA = names[0];
			teamB = names[1].trim();
			twitch.sendMessage("Teams set! " + teamA + " v. " + teamB);			
		}
	}
});

//getteams
commands.create({
	name: "teams",
	admin: true,
	command: function(command) {
		if (teamA && teamB){
			twitch.sendMessage(teamA + " v. " + teamB);
		}
	}
});

/*setrosters
commands.create({
	name: "setroster",
	admin: true,
	command: function(command) {
		var names = command.params.join(" ").split(",");

		twitch.sendMessage("Teams set! " + teamA + " v. " + teamB);
	}
});
*/