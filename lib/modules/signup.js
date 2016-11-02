let twitch = require('./../twitch');
let commands = require('./../commands');

let tourny = false;
let koth = false;

// signup command
commands.create({
	name: "signup",
	command: function() {
		if (tourny) {
			twitch.sendMessage("Signups are now closed for the " + month + "/" + day + " tournament! " +
				"Type !signuplist to see all entries");
		} else twitch.sendMessage("https://signup.gamingnex.us/");
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
			client.action("nexusgamingrl", "https://nxs.challonge.com/" + month + day);
		} else client.action("nexusgamingrl", "Tournament bracket will be available shortly after signups close!");
	}
});

//tourneymode
commands.create({
	name: "tourneymode",
	admin: true,
	command: function(command) {
		if (command.params === "on") tourny = true;
		else if (command.params === "off") tourny = false;
	}
});

//kothmode
commands.create({
	name: "kothmode",
	admin: true,
	command: function(command) {
		if (command.params === "on") koth = true;
		else if (command.params === "off") koth = false;
	}
});

module.exports = {};
