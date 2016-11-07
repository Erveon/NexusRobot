let twitch = require('./../twitch');
let commands = require('./../commands');
let db = require('./../database');


//nudes
commands.create({
	name: "nudes",
	aliases: [ "kerrysnudes" ],
	command: function(command) {
		if (command.params)
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
				db.getMyNudes(username, function(amount){
					twitch.sendMessage(username + " has requested Kerry's nudes " + amount + " times");
				});
			});
		});
	}
});

commands.create({
	name: "nudemaster",
	command: function(command){
		db.getNudes(function(amount){
			db.getMaster(function(userdata){
				twitch.sendMessage("Nudemaster is " + userdata[0].username + " with " + userdata[0].count + " requests for kerry's nudes (" + (userdata[0].count/amount*100.00).toFixed(2) + "% of total requests)");
			});
		});
	}
})