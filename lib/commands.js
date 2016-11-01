let config = require('./../config/config');
let admins = config.twitch.admins;

let Commands = {};

// Array of commands
Commands.commands = [];

/*
*  Holds a reference to what to execute for the command
*  for its name and aliases
*
* - Name [String]: What to type to execute the command
* - Alias [Array]: Any aliases the name has
* - Admin [Boolean]: Whether or not it's an admin command
* - Exec [Function]: What to execute (Expects twitch username and params as input)
*/
Commands.create = function(options) {
	if(options.name === undefined || options.command === undefined) {
		console.log("Command could not be created:");
		console.log(JSON.stringify(options, null, 4));
	}

	var command = {
		admin: options.admin || false,
		mod: options.mod || false,
		dispatch: options.command
	};

	Commands.commands[options.name] = command;

	if(options.aliases) {
		for(let alias in options.aliases) {
			Commands.commands[alias] = command;
		}
	}
};

/*
*  Executes a command with specified parameters
*
* - Cmd [String]: The name of the entered command
* - Who [String]: Twitch name of who executed the command
* - Params [Array]: An array of the parameters
* - Self [Object]: module that created the command
*/
Commands.execute = function(cmd, who, params) {
	if(Commands.commands[cmd] === undefined) return; // Command not found
	let command = Commands.commands[cmd];

	if(command.admin) {
		// If it's an admin command, stop if they're not an admin
		if(admins.indexOf(who["display-name"]) === -1) return;
	}

	if(command.mod) {
		// stop if they're not mod
		if(!who['mod']) return;
	}

	let options = {
		who: who,
		params: params
	}

	Commands.commands[cmd].dispatch(options);
};

module.exports = Commands;
