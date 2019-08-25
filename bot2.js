var Discord = require('discord.io');
 
var bot = new Discord.Client({
    token: "",
    autorun: true
});
 
bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});
 
bot.on('message', function(user, userID, channelID, message, event) {
    if (message === "ping") {
        bot.sendMessage({
            to: channelID,
            message: "pong"
        });
    }
});

bot.on("presence", function(user, userID, status, game, event) {
	console.log(user + " is now: " + status);
});

bot.on("any", function(event) {
	console.log(event);
});

bot.on("disconnect", function() {
	console.log("Bot disconnected");
	/*bot.connect()*/ //Auto reconnect
});