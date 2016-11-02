let twitch = require('./../twitch');
let commands = require('./../commands');

// Per option:
// { optionname: "votes": [] }
let poll = {};
let isVoting = false;

let hasVoted = function(username) {
	for(let option in poll) {
		if(poll[option].votes[username] !== undefined)
			return true;
	}
	return false;
};

// Who voted and what they picked
let addVote = function(username, picked) {
	if(poll[picked] === undefined) return;
	poll[picked].votes.push(username);
};

// Creates the option in the poll and adds the command
let createOption = function(option) {
	poll[option] = {
		"votes": []
	}
	commands.create({
		name: option,
		command: function(command) {
			if(isVoting) addVote(command.who['display-name'], option);
		}
	});
};

//create a poll with the specified parameters
commands.create({
	name: "poll",
	admin: true,
	command: function(command) {
		if(command.params.length < 2) return;
		poll = {};
		let optionMessage = "";
		for(let i = 0; i < command.params.length; i++) {
			let param = command.params[i];
			createOption(param);
			optionMessage += "!" + param + " ";
		}
		isVoting = true;
		twitch.sendMessage("Voting has started! Options: " + optionMessage);
	}
});

//end poll
commands.create({
	name: "endpoll",
	admin: true,
	command: function(command) {
		isVoting = false;
		for(let option in poll) {
			commands.remove(option);
		}
	}
});

//show poll results
commands.create({
	name: "pollresults",
	admin: true,
	command: function(command) {
		let result = "";
		for(let option in poll) {
			result += option + ": " + poll[option].votes.length + " votes. ";
		}
		twitch.sendMessage(result);
	}
});
