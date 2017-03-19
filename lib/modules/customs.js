let twitch = require('./../twitch');
let commands = require('./../commands');
let db = require('./../database');

//nudes
commands.create({
	name: "create",
	aliases: [],
	mod: true,
	command: function(command) {
		var key = command.params[0];
		var value = command.params.slice(1,command.params.length).join(" ");
		if  (key !== "create" && key !== "remove"){
			//SQL callbacks
			db.checkCommand(key,function(exists){
				db.createCommand(key, value, function(){
					db.updateCommand(key, value, function(){
						if (exists){
							twitch.sendMessage("Command updated: !" + key);
						}
						else {
							twitch.sendMessage("Command created: !" + key);
						}
					});
				});
			});			
		} 
		else {
			twitch.sendMessage("stop that");
		}
	}
});

commands.create({
	name: "remove",
	aliases: [],
	mod: true,
	command: function(command) {
		var key = command.params[0];
		db.checkCommand(key, function(exists){
			db.removeCommand(key, function(){
				if (exists){
					twitch.sendMessage("Command removed: !" + key);
				}
				else {
					twitch.sendMessage("Command not found.");
				}
			});
		});
	}
});



//commands.create({
	//name: "show",
	//aliases: [],
	//mod: true,
	//command: function(command) {
		//var key = command.params[0];
		//console.log(commands.commands[key].mod);
	//}
//})
