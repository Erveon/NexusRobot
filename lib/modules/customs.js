let twitch = require('./../twitch');
let commands = require('./../commands');
let db = require('./../database');

let coms = require('../../index.js');

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
							coms.customs[key]=value;
						}
						else {
							twitch.sendMessage("Command created: !" + key);
							coms.customs[key]=value;
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
					delete coms.customs[key];
				}
				else {
					twitch.sendMessage("Command not found.");
				}
			});
		});
	}
});



commands.create({
	name: "show",
	aliases: [],
	admin: true,
	command: function(command) {
		console.log(coms.customs);
	}
});


