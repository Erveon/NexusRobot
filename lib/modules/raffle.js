let twitch = require('./../twitch');
let commands = require('./../commands');
let config = require('./../../config/config');
let admins = config.twitch.admins;

var raffle = {};
var raf = false;
var key;

//creates a new entry
let addEntry = function(username, key) {
	if(raffle[key] === undefined) return;
	raffle[key].entries.push(username);
};

//creates a new keyword for a raffle
let createKeyword = function(newkey) {
	raffle[newkey] = {
		"entries": []
	}

	commands.create({
		name: newkey,
		command: function(command) {
			if (raf){
				if (raffle[newkey].entries.indexOf(command.who["display-name"]) === -1){
					addEntry(command.who['display-name'], newkey)
				}
			}
		}
	});

	commands.create({
		name: "draw",
		mod: true,
		command: function() {
			var winner = raffle[key].entries[Math.floor(Math.random()*raffle[key].entries.length)]
			if (winner === undefined){
				twitch.sendMessage("The winner is nexusbot2!");
			}
			else{
				twitch.sendMessage("The winner is " + winner + "! Congratulations!");
			}
		}
});
};

//raffle
commands.create({
	name: "raffle",
	mod: true,
	command: function(command) {
		if (command.params[0] === "start") {
			if (command.params[1] !== undefined && commands.commands[command.params[1]] === undefined && !raf){
				createKeyword(command.params[1]);
				key = command.params[1];
				console.log();
			}
			else {
				createKeyword("nexus");
				key = "nexus"
			}
			raf = true;
			twitch.sendMessage("Raffle is now OPEN! Type !" + key + " to enter");
		}
		else if (command.params[0] === "end") {
			raf = false;
			twitch.sendMessage("Raffle is now CLOSED! Stand by for winner");
		}
	}
});