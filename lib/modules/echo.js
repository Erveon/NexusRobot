let twitch = require('./../twitch');
let commands = require('./../commands');

//display current casters
commands.create({
	name: "echo",
	admin: true,
	command: function(command) {
		if (command.who['message-type']==="whisper"){
			if (command.params.length>0){
				var echo = command.params.join(" ");
				//console.log(command.who['display-name'] + ":" + echo);
				twitch.sendMessage(echo);
			}
		}
	}
});

module.exports = {};
