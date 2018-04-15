const Discord = require('discord.js');
const client = new Discord.Client();
var channel = 0;
var regex1 = RegExp('FORTNITE');
var regex2 = RegExp('RAWR');
// 'client.on('message')' commands are triggered when the
// specified message is read in a text channel that the bot is in.

client.on('message', message => {
	channel = message.channel; 
  if (regex2.test((message.content).toUpperCase()) === true) {
    message.channel.send('XD');
  }
  else if (regex1.test((message.content).toUpperCase()) === true) {
    message.channel.send('WHOMST\'D\'VE\'EST WANTS TO PLAY TOWER TILTING SIMULATOR XDDDDDDDDD');
  }
  else if (message.isMentioned(client.users.get('User ID Here (Optional)')) === true) {
	  message.channel.send('DO NOT MENTION THE GREAT ONE\'S NAME')
  }
});

client.login("Your Token Here");