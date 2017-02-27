let twitch = require('./../twitch');
let commands = require('./../commands');
let config = require('./../../config/config');
let admins = config.twitch.admins;

let link;

var time = new Date();
var month = time.getMonth()+1;
var day = time.getDate();

// signup command
commands.create({
	name: "signup",
	command: function() {
		twitch.sendMessage("Signup here: https://signup.gamingnex.us/");
	}
});

// join command
commands.create({
	name: "join",
	command: function() {
		twitch.sendMessage("https://signup.gamingnex.us/");
	}
});

// signuplist command
commands.create({
	name: "signuplist",
	command: function() {
		twitch.sendMessage("https://signup.gamingnex.us/signuplist");
	}
});

//bracket
commands.create({
	name: "bracket",
	command: function(command) {
		if (command.params[0] === "set" && command.who.mod){
			link = command.params[1];;
		}
		if (link !== undefined){
			twitch.sendMessage("https://nxs.challonge.com/" + link);
		}
		else {
			twitch.sendMessage("!bracket will be online at the start of the tournament!")
		}
	}
});

module.exports = {};
