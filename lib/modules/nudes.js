let twitch = require('./../twitch');
let commands = require('./../commands');
let db = require('./../database');

//nudes
commands.create({
	name: "nudes",
	aliases: [ "kerrysnudes" ],
	command: function() {
		db.incNudes(function(){
			db.getNudes(function(amount){
				twitch.sendMessage("Kerry's nudes have been requested " + amount + " times");
			});
		});
	}
});
