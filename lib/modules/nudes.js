let twitch = require('./../twitch');
let commands = require('./../commands');
let db = require('./../database_v2');


//nudes
commands.create({
	name: "nudes",
	aliases: [ "kerrysnudes" ],
	command: function(command) {
		var username = command.who['display-name'];
		db.checkUser(username, function(){
			db.createUser(username, function(){
				db.incNudes(username, function(){
					db.getNudes(function(amount){
						twitch.sendMessage("Kerry's nudes have been requested " + amount + " times");
					});
				});
			});
		});
	}
});

commands.create({
	name: "mynudes",
	aliases: [ "mynuderequests" ],
	command: function(command) {
		var username = command.who['display-name'];
		db.checkUser(username, function(){
			db.createUser(username, function(){
				db.incNudes(username, function(){
					db.getMyNudes(username, function(amount){
						twitch.sendMessage(username + " has requested Kerry's nudes " + amount + " times");
					});
				});
			});
		});
	}
});