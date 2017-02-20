var db = require("./lib/database");
var config = require('./config/config');
var twitch = require('./lib/twitch');
let commands = require('./lib/commands');
let customs = require('./lib//modules/customs');

twitch.connect();

//console.log(customs.temp_customs);

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
	let input = message.slice(1, message.length).split(" ");

	// eliminates extra spaces
	input = input.filter(function(word){
        return word;
    });

	let params = input.slice(1, input.length + 1);

	if (customs.temp_customs[input[0]] !== undefined){
		twitch.sendMessage(customs.temp_customs[input[0]]);
	}
	else commands.execute(input[0], user, params);
});

twitch.client.on('connected', function(address, port) {
	twitch.sendMessage("BETA™ has connected!");
});