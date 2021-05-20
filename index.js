const Eris = require("eris");
const express = require('express');
require('dotenv').config();
var token = process.env.BOT_TOKEN;
if (process.argv[2]) {
	token = process.argv[2];
}

const app = express()
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`NodeJS app is running on port ${ port }`);
});

app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
	let message = 'Hello World! ' + request;
	response.send(message);
})

var referenceMessageInfo = {
	id: "712464257488257034",
	channelid: "712432299073077277"
};
var referenceMessage;
var dataChunk1 = {};

var config = {
	"welcomeChannel": "467953550711062530",
	"defaulOptions": {},
	"normalOptions": {},
	"devOptions1": {
		requirements: {
			roleNames: ["Owner"]
		},
		//hidden: true,
		description: "command",
		fullDescription: "a dev command",
		deleteCommand: false
	},
	"murOptions1": {
		//hidden: true,
		description: "command",
		fullDescription: "a dev command",
		deleteCommand: false
	},
	"del": {deleteCommand: true}
};
// Initialize Discord Bot
var bot = new Eris.CommandClient(token, {}, {
	description: "A bot made with Eris",
	owner: "CyTic",
	prefix: "/",
	defaultCommandOptions: {
		deleteCommand: true
	}
});

bot.on("ready", () => { // When the bot is ready
   console.log('Connected');
	console.log('Logged in as: ');
	console.log(bot.user.username + ' (' + bot.user.id + ') - online');
	
	//console.log(bot.getChannel(referenceMessageInfo.channelid));
	bot.getMessage(referenceMessageInfo.channelid, referenceMessageInfo.id).then((result) => {referenceMessage = result;}, (err) => {console.log(err);});
});
bot.on("guildMemberAdd", (guild, member) => {
	if (bot.channelGuildMap[config.welcomeChannel])
	{
		bot.createMessage(config.welcomeChannel, "Welcome!");
	}
});

bot.registerCommandAlias("halp", "help"); // Alias !halp to !help
bot.registerCommandAlias("commands", "help"); // Alias !commands to !help

bot.registerCommand("ping", (msg, args) => {
	switch(msg.member.id) {
		/*case "234076478231281664": 
			bot.createMessage(msg.channel.id, "please no more...");
			return "Baka!";
			break;*/
		case "567651945867640832": 
			return `Konichiwa ${msg.member.nick ? msg.member.nick : msg.member.username}san!`;
			break;
		default: return `Hey! What's up ${msg.member.nick ? msg.member.nick : msg.member.username}?`;
	}
}, {
	// Make a ping command
	// Responds with "Pong!" when someone says "!ping"
   description: "Pong!",
   fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored."
});
bot.registerCommand("pong", ["Pang!", "Peng!", "Ping!", "Pung!"], { // Make a pong command
	// Responds with a random version of "Ping!" when someone says "!pong"
   description: "Ping!",
   fullDescription: "This command could also be used to check if the bot is up. Or entertainment when you're bored."
});
bot.registerCommand("donate", "You can get special VIP status and perks by donating here: http://wtsf.22web.org/donate.html", {
	description: "Donate command",
   fullDescription: "Use this command to learn more about donating."
});
bot.registerCommand("voteCandidates", (msg, args) => {
	return "Hi";
}, {
	...config.murOptions1,
	...config.del
});
bot.registerCommand("vote", (msg, args) => {
	if (args[0]) {
		whoFor = args[0];
		dataChunk1[msg.member.id] = whoFor;
		//bot.getUserProfile(whoFor).then((result) => {dataChunk1[whoFor]++}, (err) => {console.log(err);});
		referenceMessage.edit(dataChunk1);
	}
}, {
	...config.murOptions1,
	...config.del
});
bot.registerCommand("test", "...", {
	...config.devOptions1,
	...config.del,
	...{requirements: {
			roleNames: ["noone", ...config.devOptions1.requirements.roleNames]
		}}
});
bot.registerCommand("set", (msg, args) => {bot.channelGuildMap}, {
	...config.devOptions1,
	...config.del
});
bot.registerCommand("auth", "...", {
	...config.devOptions1,
	...config.del
});


console.log("Logging in");
bot.connect();

/*
bot.on("presence", function(user, userID, status, game, event) {
	console.log(user + " is now: " + status);
});

bot.on("any", function(event) {
	console.log(event);
});
*/