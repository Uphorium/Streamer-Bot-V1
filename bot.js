const Eris = require("eris");
var auth = require('./auth.json');
var bot = new Eris("auth.token");

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
	console.log('Connected');
	console.log('Logged in as: ');
	console.log(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `/`
    if (message.substring(0, 1) == '/') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});
bot.on("disconnect", function() { // Occasionally the bot disconnects.
	console.log("Disconnected... \nNow reconnecting");
    bot.connect(); // Just reconnect when that happens.
});