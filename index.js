var db = require("./lib/database");
var config = require('./config/config');
var twitch = require('./lib/twitch');
let commands = require('./lib/commands');

customs = Object.create(null);
module.exports.customs = customs;

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
require('./lib/modules/customs');
require('./lib/modules/colors');
require('./lib/modules/echo');

twitch.client.on('message', function(channel, user, message, self) {


	if (self) return;
	let prefix = config.bot.prefix;

	if (!message.startsWith(prefix)) return;


	//passes command into an array of single words
	let input = message.slice(1, message.length).split(" ");

	// eliminates extra spaces
	input = input.filter(function(word){
        return word;
    });

	let params = input.slice(1, input.length + 1);

	let tag = null;
	if (params.length>0&&params[params.length-1].startsWith("-")){
		tag = params[params.length-1].slice(1,params[params.length-1].length);
		params.pop();
	}

	if (customs[input[0]]!==undefined) {
		twitch.sendMessage(customs[input[0]]);
	}
	else {
		commands.execute(input[0], user, params, tag);
	}
});


twitch.client.on('connected', function(address, port) {
	
	db.loadCommands(function(data) {
		for (var i=0; i<data.length; i++){
			var com = data[i];
			customs[com['command_name']] = com['command_output'];
		}
	});	

	twitch.sendMessage("BETA™ has connected!");
});