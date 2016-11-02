let twitch = require('./../twitch');
let commands = require('./../commands');

var team1;
var team2;
var teamvotes1;
var teamvotes2;

//startpoll
commands.create({
	name: "startpoll",
	admin: true,
	command: function(command) {
		team1 = command.params[0];
		team2 = command.params[1];
		votes = {};
		twitch.sendMessage("Voting has started! Vote by typing !" + team1 + " or !" + team2 + " in chat below!");
	}
});

//startpoll
commands.create({
	name: "endpoll",
	admin: true,
	command: function(command) {
		var teamvotes1 = 0;
		var teamvotes2 = 0;
		for (var key in votes){
			if (votes.hasOwnProperty(key)){
				if (votes[key]===1){
					teamvotes1++;
				}
				else if (votes[key]===2){
					teamvotes2++;
				}
			}
		}
	}
});

//showpoll
commands.create({
	name: "showpoll",
	admin: true,
	command: function(command) {
		if (teamvotes1 === teamvotes2){
			twitch.sendMessage("TIE! Please restart poll");
		} else {
			var winner = teamvotes1 > teamvotes2 ? team1 : team2;
			var votenum = teamvotes1 > teamvotes2 ? teamvotes1 : teamvotes2;
			twitch.sendMessage("The winner is " + winner + " with " + votenum + " votes!");					
		}
	}
});

//pick team 1
commands.create({
	name: team1,
	command: function() {
		if (!(user["display-name"] in votes)){
			votes[user["display-name"]] = 1;
		}
	}
});

//pick team 2
commands.create({
	name: team2,
	command: function() {
		if (!(user["display-name"] in votes)){
			votes[user["display-name"]] = 2;
		}
	}
});