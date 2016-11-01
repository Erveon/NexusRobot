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
database.USER = "username";
database.PASSWORD = "password";
database.DATABASE = "database";

// Twitch information
let twitch = {};

twitch.username = "username";
twitch.password = "password"; // usually oauth
twitch.channels = ["channel"];

// Temporary variable until
// the database supports this
twitch.admins = [];

module.exports.bot = bot;
module.exports.database = database;
module.exports.twitch = twitch;
