let twitch = require('./../twitch');
let commands = require('./../commands');
let db = require('./../database');
let writer = require('./../writer');

let temp_customs = {};

//nudes
commands.create({
	name: "create",
	aliases: [],
	mod: true,
	command: function(command) {
		var key = command.params[0];
		var value = command.params.slice(1,command.params.length).join(" ");;
		console.log(key + ", " + value);
		writer.readDictionary(function(dictionary){
			writer.addPair(dictionary, key, value, function(){
				writer.writeDictionary(dictionary, function(){
					twitch.sendMessage("command written: \"!" + key + "\"");
				});
			});
		});
		temp_customs[key] = value;
	}
});

commands.create({
	name: "remove",
	aliases: [],
	mod: true,
	command: function(command) {
		var key = command.params[0];
		writer.readDictionary(function(dictionary){
			writer.deletePair(dictionary, key, function(){
				writer.writeDictionary(dictionary, function(){
					twitch.sendMessage("command deleted: \"!" + key + "\"");
				});
			});
		});
		delete temp_customs[key];
	}
});

module.exports.temp_customs = temp_customs;