// This is an example of the config required to run the bot
// It handles sensitive data that is not pushed to the git repo

// Copy this file, and rename it to config.js
// then fill in the appropriate information for your set-up

// General bot settings
let bot = {};
bot.prefix = "!";

// The MySQL database
let database = {};

database.HOST = "localhost";
database.USER = "root";
database.PASSWORD = "rudy41732";
database.DATABASE = "nexus_twitch";

// Twitch information
let twitch = {};

twitch.username = "nexusrobot";
twitch.password = "oauth:dpx2f2xds17ynd1l75h3pmej1y7rbt"; // usually oauth
twitch.channels = ["NexusGamingRL"];

// Temporary variable until
// the database supports this
twitch.admins = ["HooooofTV","nexusbot2","Erveon","EliteBeef"];

module.exports.bot = bot;
module.exports.database = database;
module.exports.twitch = twitch;
