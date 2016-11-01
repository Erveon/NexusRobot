var db = require("./lib/database");
var config = require('./config/config');
var twitch = require('./lib/twitch');
let commands = require('./lib/commands');

twitch.connect();

// enable modules
require('./lib/modules/casters');
require('./lib/modules/signup');
require('./lib/modules/website');
require('./lib/modules/ban');


twitch.client.on('chat', function(channel, user, message, self) {
	let prefix = config.bot.prefix;
	if (!message.startsWith(prefix)) return;

	//passes command into an array of single words
	let command = message.slice(1, message.length).split(" ");

	// eliminates extra spaces
	command = command.filter(function(word){
        return word;
    });

	let params = command.slice(1, command.length + 1);
	commands.execute(command[0], user, params);
});

twitch.client.on('connected', function(address, port) {
	twitch.sendMessage("BETA™ has connected!");
});

//responding to user inputs
/*twitch.client.on('chat', function(channel, user, message, self){

	var prefix = config.bot.prefix;
	if (!message.startsWith(prefix)) return;

	//passes command into an array of single words
	var command = message.slice(1, message.length).split(" ");

	// eliminates extra spaces
	command = command.filter(function(word){
        return word;
    });

	//time builder
	var time = new Date();
	var month = time.getMonth()+1;
	var day = time.getDate();
	var hour = time.getHours(); //anticipating issues for tourneys that run past midnight

	//ADMIN COMMANDS
	if (admins.indexOf(user['display-name']) !== -1) {
		switch (command[0]){

			//ENABLE BRACKETS/TOURNEY COMMANDS
			case "tourneymode": //allows !bracket command to output current bracket, closes out !signup command
				if (command[1] === "on"){
					tourney = true;
					twitch.sendMessage("Signups are now closed for the " + month + "/" + day + " tournament! Type !signuplist to see all entries");
				}
				else if (command[1] === "off")
					tourney = false;
					twitch.sendMessage("Thank you tournament participants and viewers!");
				break;

			//RAFFLE
			case "startraffle":
				raffle = [];
				raf = true;
				twitch.sendMessage("Raffle is now OPEN! Type !pickme to enter");
				break;
			case "endraffle":
				raf = false;
				twitch.sendMessage("Raffle is now CLOSED! Stand by for winner");
				break;
			case "drawraffle":
				twitch.sendMessage("The winner is " + raffle[Math.floor(Math.random()*raffle.length)] + "! Congratulations!");
				break;

			//poll
			case "startpoll":
				team1 = command[1];
				team2 = command[2];
				votes = {};
				twitch.sendMessage("Voting has started! Vote by typing !" + team1 + " or !" + team2 + " in chat below!");
				break;
			case "endpoll":
				twitch.sendMessage("Voting has ended! Stand by for results...");
				teamvotes1 = 0;
				teamvotes2 = 0;
				for (var key in votes){
					if (votes.hasOwnProperty(key)){
						if (votes[key]===1){
							teamvotes1++;
						}
						else if (votes[key]===2){
							teamvotes2++;
						}
					}
				}
				console.log("POLL OUTCOME:");
				console.log("{" + team1 + " : " + teamvotes1 + "}");
				console.log("{" + team2 + " : " + teamvotes2 + "}");
				break;
			case "showpoll":
				if (teamvotes1 === teamvotes2){
					twitch.sendMessage("TIE! Please restart poll");
				}
				else {
					var winner = teamvotes1 > teamvotes2 ? team1 : team2;
					var votenum = teamvotes1 > teamvotes2 ? teamvotes1 : teamvotes2;
					twitch.sendMessage("The winner is " + winner + " with " + votenum + " votes!");
				}
				break;
		}
	}

	//MOD COMMANDS
	if (user['mod']){
		switch (command[0]){
			case "ban":
				command.shift();
				command = command.join(" ");
				twitch.sendMessage(command + " has been banned!");
				break;
		}
	}

	//USER COMMANDS
	switch (command[0]){

		//kerrysnudes
		case "nudes":
			db.incNudes(function(){
				db.getNudes(function(amount){
					twitch.sendMessage("Kerry's nudes have been requested " + amount + " times");
				});
			});
			break;

		//tournament stuff
		case "signup":
			if (tourney){
				twitch.sendMessage("Signups are now closed for the " + month + "/" + day + " tournament! Type !signuplist to see all entries");
			}
			else {
				twitch.sendMessage("https://signup.gamingnex.us/");
			}
			break;
		case "signuplist":
			twitch.sendMessage("https://signup.gamingnex.us/signuplist");
			break;
		case "bracket":
			if (tourney){
				twitch.sendMessage("https://nxs.challonge.com/" + month + day);
			}
			else {
				twitch.sendMessage("Tournament bracket will be available shortly after signups close!");
			}
			break;

		//SOCIAL MEDIA
		case "twitter":
			twitch.sendMessage("http://twitter.com/nexusgamingrl");
			break;
		case "patreon":
			twitch.sendMessage("http://patreon.com/nexusgaming");
			break;
		case "discord":
			twitch.sendMessage("https://discordapp.com/invite/UAQkEu9");
			break;
		case "website": //also responds to !site
			twitch.sendMessage("Visit us on the web @ https://gamingnex.us/");
			break;
		case "matcherino":
			twitch.sendMessage("https://matcherino.com/b/tournaments/4271 use code 'nexusgaming' to donate a free dollar!");
			break;

		//raffle
		case "pickme":
			if (raf){
				if (raffle.indexOf(user["display-name"]) === -1){
					raffle.push(user["display-name"]);
				}
			}
			break;

		//poll voting
		case team1:
			if (!(user["display-name"] in votes)){
				votes[user["display-name"]] = 1;
				console.log(votes);
			}
			else {
				console.log(user["display-name"] + "already voted!");
			}
			break;
		case team2:
			if (!(user["display-name"] in votes)){
				votes[user["display-name"]] = 2;
				console.log(votes);
			}
			break;

		//help
		case "help":
			twitch.sendMessage("User commands: !signup, !signuplist, !bracket, !twitter, !patreon, !discord");
			break;
	}

	/*COMMAND LIST

	!casters - display current casters
	!rosters - display team names and rosters

	*/
//});
