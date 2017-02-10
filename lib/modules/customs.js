let twitch = require('./../twitch');
let commands = require('./../commands');
let db = require('./../database');
let writer = require('./../writer');
let commandLib = require('./../utils/command-library')

let temp_customs = {};
let removed = [];

//nudes
commands.create({
	name: "create",
	aliases: [],
	mod: true,
	command: function(command) {
		var key = command.params[0];
		var value = command.params.slice(1,command.params.length).join(" ");;
		console.log(key + ", " + value);
		if  (key !== "create" && key !== "remove"){
			writer.readDictionary(function(dictionary){
				writer.addPair(dictionary, key, value, function(){
					writer.writeDictionary(dictionary, function(){
						twitch.sendMessage("command written: \"!" + key + "\"");
					});
				});
			});
			temp_customs[key] = value;
		}
	}
});

commands.create({
	name: "remove",
	aliases: [],
	mod: true,
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
			removed.push(key);
			console.log(removed);
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
module.exports.removed = removed;