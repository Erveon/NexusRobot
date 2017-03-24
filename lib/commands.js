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
		console.log(options);
		console.log(JSON.stringify(options, null, 4));
	}

	if(typeof Commands.commands[options.name] === "object") return;

	var command = {
		admin: options.admin || false,
		mod: options.mod || false,
		dispatch: options.command
	}

	Commands.commands[options.name] = command;

	if(options.aliases !== undefined) {
		for(let alias in options.aliases) {
			Commands.commands[alias] = command;
		}
	}
};

/*
*  Removes the specified command, does not remove the aliases,
*  those have to be removed individually.
*  Useful for temporary commands.
*
* - Command [String]: command to remove
*/
Commands.remove = function(command) {
	Commands.commands[command] = undefined;
};

/*
*  Executes a command with specified parameters
*
* - Cmd [String]: The name of the entered command
* - Who [String]: Twitch name of who executed the command
* - Params [Array]: An array of the parameters
* - Self [Object]: module that created the command
*/
Commands.execute = function(cmd, who, params, tag) {

	if(typeof Commands.commands[cmd] !== "object") return; // Command not found
	let command = Commands.commands[cmd];

	//if whisper is recieved from an admin, adds mod property to their userstate object
	if(who['message-type']==="whisper"){
		if(admins.indexOf(who['user-id'])!==-1){
			who['mod'] = true;
		}
		else {
			who['mod'] = false;
		}
	}

	//if admin command, checks if user is admin
	if(command.admin) {
		if(admins.indexOf(who['user-id']) === -1) return;
	}

	//if mod command, checks if user is mod (admin overrides mod)
	if(command.mod) {
		if(!who['mod']||(admins.indexOf(who['user-id'])===-1)) return;
	}

	let options = {
		who: who,
		params: params,
		tag: tag
	}

	Commands.commands[cmd].dispatch(options);
};

module.exports = Commands;
