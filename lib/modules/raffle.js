let twitch = require('./../twitch');
let commands = require('./../commands');

var raffle;
var raf = false;

//startraffle
commands.create({
	name: "startraffle",
	admin: true,
	command: function() {
		raffle = [];
		raf = true;
		twitch.sendMessage("Raffle is now OPEN! Type !pickme to enter");
	}
});

//endraffle
commands.create({
	name: "endraffle",
	admin: true,
	command: function() {
		raf = false;
		twitch.sendMessage("Raffle is now CLOSED! Stand by for winner");
	}
});

//drawraffle
commands.create({
	name: "drawraffle",
	admin: true,
	command: function() {
		twitch.sendMessage("The winner is " + raffle[Math.floor(Math.random()*raffle.length)] + "! Congratulations!");
	}
});

//user pick command
commands.create({
	name: "pickme",
	command: function(command) {
		if (raf){
			if (raffle.indexOf(command.who["display-name"]) === -1){
				raffle.push(command.who["display-name"]);
			}
		}
	}
});