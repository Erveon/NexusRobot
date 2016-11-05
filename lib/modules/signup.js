let twitch = require('./../twitch');
let commands = require('./../commands');

let tourny = false;
let koth = false;

var time = new Date();
var month = time.getMonth()+1;
var day = time.getDate();

// signup command
commands.create({
	name: "signup",
	command: function() {
		if (tourny) {
			twitch.sendMessage("Signups are now closed for the " + month + "/" + day + " tournament! " +
				"Type !signuplist to see all entries");
		} else {
			twitch.sendMessage("https://signup.gamingnex.us/");
		}
	}
});

// join command
commands.create({
	name: "join",
	command: function() {
		if (koth) {
			twitch.sendMessage("Signup link for today's KotH: https://goo.gl/forms/tpQrBbptW7HVZfYV2");
		} else {
			twitch.sendMessage("https://signup.gamingnex.us/");
		}
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
	command: function() {
		if (tourny) {
			twitch.sendMessage("https://nxs.challonge.com/" + month + day);
		} else {
			twitch.sendMessage("Tournament bracket will be available shortly after signups close!");
		}
	}
});

//tourneymode
commands.create({
	name: "tournymode",
	admin: true,
	command: function(command) {
		if(command.params < 1) {
			tourny = !tourny;
			console.log(tourny);
		} else {
			if (command.params[0] === "on") tourny = true;
			else if (command.params[0] === "off") tourny = false;
			console.log(tourny);
		}
	}
});

//kothmode
commands.create({
	name: "kothmode",
	admin: true,
	command: function(command) {
		if(command.params < 1) {
			koth = !koth;
			console.log(koth);
		} else {
			if (command.params[0] === "on") koth = true;
			else if (command.params[0] === "off") koth = false;
			console.log(koth + "2");
		}
	}
});

module.exports = {};
