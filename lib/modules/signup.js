let twitch = require('./../twitch');
let commands = require('./../commands');

let tourny = false;

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

module.exports = {};
