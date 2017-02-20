let twitch = require('./../twitch');
let commands = require('./../commands');
let db = require('./../database');
let writer = require('./../writer');
let commandLib = require('./../utils/command-library')

let temp_customs = commandLib;

//nudes
commands.create({
	name: "create",
	aliases: [],
	admin: true,
	command: function(command) {
		var key = command.params[0];
		var value = command.params.slice(1,command.params.length).join(" ");;
		if  (key !== "create" && key !== "remove"){
			writer.readDictionary(function(dictionary){
				writer.addPair(dictionary, key, value, function(){
					writer.writeDictionary(dictionary, function(){
						twitch.sendMessage("command written: \"!" + key + "\"");
					});
				});
			});
			temp_customs[key] = value;
		} else {
			twitch.sendMessage("stop that");
		}
	}
});

commands.create({
	name: "remove",
	aliases: [],
	admin: true,
	command: function(command) {
		var key = command.params[0];
		if (commandLib[key] !== undefined) {
			writer.readDictionary(function(dictionary){
				writer.deletePair(dictionary, key, function(){
					writer.writeDictionary(dictionary, function(){
						twitch.sendMessage("command deleted: \"!" + key + "\"");
					});
				});
			});
			delete temp_customs[key];
		}
	}
});

commands.create({
	name: "show",
	aliases: [],
	mod: true,
	command: function(command) {
		console.log(temp_customs);
	}
})

module.exports.temp_customs = temp_customs;