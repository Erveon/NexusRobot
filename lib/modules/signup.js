let twitch = require('./../twitch');
let commands = require('./../commands');

let tourny = false;
let koth = false;

let lobby;
let pass;
let link;

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
			if (link !== undefined){
				twitch.sendMessage("https://nxs.challonge.com/" + link);
			}
			else {
				twitch.sendMessage("!bracket will be online shortly!")
			}
			
		} else {
			twitch.sendMessage("Signups are still open - !bracket will online shortly after closing!");
		}
	}
});

//set bracket
commands.create({
	name: "setbracket",
	command: function(command) {
		if (command.params.length === 1) {
			link = command.params[0];
			twitch.sendMessage("Bracket link set to https://nxs.challonge.com/" + link);
		} else {
			twitch.sendMessage("Please supply an argument (link)");
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
		} else {
			if (command.params[0] === "on") tourny = true;
			else if (command.params[0] === "off") tourny = false;
		}
		let ret;
		tourny ? ret = "!signup has ended, !bracket online shortly." : ret = "!bracket reset !signup restored";
		twitch.sendMessage(ret);
	}
});

//kothmode
commands.create({
	name: "kothmode",
	admin: true,
	command: function(command) {
		if(command.params < 1) {
			koth = !koth;
		} else {
			if (command.params[0] === "on") koth = true;
			else if (command.params[0] === "off") koth = false;
		}
		let ret;
		koth ? ret = "!join to join the KotH queue!" : ret = "KotH has ended, be sure to !join in next time!";
		twitch.sendMessage(ret);
	}
});

//setlobby command
commands.create({
	name: "setlobby",
	admin: true,
	command: function(command) {
		if (command.params.length === 2){
			lobby = command.params[0];
			pass = command.params[1];
			twitch.sendMessage("Lobby/Password set! Use !viewer to display info");
		} else {
			twitch.sendMessage("Please supply two arguments (lobby, password)")
		}
	}
});

module.exports = {};
