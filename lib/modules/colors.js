let twitch = require('./../twitch');
let commands = require('./../commands');

colors_nt = [
	"Blue",
	"BlueViolet",
	"CadetBlue",
	"Chocolate",
	"Coral",
	"DodgerBlue",
	"Firebrick",
	"GoldenRod",
	"Green",
	"HotPink",
	"OrangeRed",
	"Red",
	"SeaGreen",
	"SpringGreen",
	"YellowGreen"
];

//display current casters
commands.create({
	name: "color",
	admin: true,
	command: function(command) {
		let newcolor = command.params[0];
		if (colors_nt.indexOf(newcolor)!==-1){
			twitch.client.color(newcolor);
		}
		else if (newcolor===undefined){
			newcolor = colors_nt[Math.floor(Math.random()*colors_nt.length)];
			twitch.client.color(newcolor);
		}
	}
});

module.exports = {};
