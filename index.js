var db = require("./lib/database");
var config = require('./config/config');
var twitch = require('./lib/twitch');
let commands = require('./lib/commands');

twitch.connect();

// enable modules
require('./lib/modules/casters');
require('./lib/modules/signup');
require('./lib/modules/website');
require('./lib/modules/ban');
require('./lib/modules/help');
require('./lib/modules/poll');
require('./lib/modules/nudes');
require('./lib/modules/raffle');
require('./lib/modules/rosters');

twitch.client.on('chat', function(channel, user, message, self) {
	let prefix = config.bot.prefix;
	if (!message.startsWith(prefix)) return;

	//passes command into an array of single words
	let command = message.slice(1, message.length).split(" ");

	// eliminates extra spaces
	command = command.filter(function(word){
        return word;
    });

	let params = command.slice(1, command.length + 1);
	commands.execute(command[0], user, params);
});

twitch.client.on("whisper", function (from, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;

    // Do your stuff.
});

twitch.client.on('connected', function(address, port) {
	twitch.sendMessage("BETA™ has connected!");
});