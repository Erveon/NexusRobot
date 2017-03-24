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
		var suppress = command.tag==="s" ? true : false;
		var key = command.params[0];
		var value = command.params.slice(1,command.params.length).join(" ");
		if  (key !== "create" && key !== "remove"){
			//SQL callbacks
			db.checkCommand(key,function(exists){
				db.createCommand(key, value, function(){
					db.updateCommand(key, value, function(){
						coms.customs[key] = value;
						if (!suppress){
							if (exists){
								twitch.sendMessage("Command updated: !" + key);
							}
							else {
								twitch.sendMessage("Command created: !" + key);
							}
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
		var suppress = command.tag==="s" ? true : false;
		var key = command.params[0];
		db.checkCommand(key, function(exists){
			db.removeCommand(key, function(){
				delete coms.customs[key];
				if (!suppress){
					if (exists){
						twitch.sendMessage("Command removed: !" + key);
					}
					else {
						twitch.sendMessage("Command not found.");
					}
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


