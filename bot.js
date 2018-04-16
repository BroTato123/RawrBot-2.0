const Discord = require('discord.js');
const client = new Discord.Client();
var channel = 0;
var memes = 477; //replace this with the number of memes
var regex1 = RegExp('FORTNITE');
var regex2 = RegExp('RAWR');
var regex3 = RegExp('\\?\\?');
var regex4 = RegExp('MEME PLEASE');
// 'client.on('message')' commands are triggered when the
// specified message is read in a text channel that the bot is in.
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
client.on('message', message => {
	channel = message.channel; 
	if (message.author.bot === false){
  if (regex2.test((message.content).toUpperCase()) === true) {
    message.channel.send('XD');
  }
  else if (regex1.test((message.content).toUpperCase()) === true) {
    message.channel.send('WHOMST\'D\'VE\'EST WANTS TO PLAY TOWER TILTING SIMULATOR XDDDDDDDDD');
  }
  /*
  else if (message.isMentioned(client.users.get('User ID Here (Optional)')) === true) {
	message.channel.send('DO NOT MENTION THE GREAT ONE\'S NAME')
  }
  else if ((message.isMentioned(client.users.get('Bot ID Here (Optional)')) === true)&& (regex4.test((message.content).toUpperCase()) === true)) {
	message.channel.send('Here\'s your meme:', {file: '/home/pi/rawrbot/memes/meme('+getRandomIntInclusive(1,memes)+').jpg'}) //replace /home/pi/rawrbot/memes/ with the path to your memes. The memes have to be named meme(number of meme).jpg
  }
  else if (message.mentions.everyone === true) {
    message.channel.send('Y\'ALL FRICKERS BETTER GET IN HERE');
  }
  */
   if (regex3.test((message.content).toUpperCase()) === true) {
    message.channel.send('RAWR XD DANK MEME');
  }
}
  else {}
});

client.login("YOUR TOKEN HERE");
