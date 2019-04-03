const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function mentionRandomPerson(message, includeAll){
    let guild = message.guild;
    let members = guild.members;
    let gm = members.random(1)[0].user;

    while (true){
        if (gm.bot) {
            console.log("Chose " + gm.username + ", but they're a bot.");
            members.delete(gm.id);
        }
        else if (gm.presence.status === "offline" && !includeAll) {
            console.log("Chose " +gm.username+", but they're offline.")
            members.delete(gm.id);
        }
        else if (gm.presence.status === "dnd" && !includeAll) {
            console.log("Chose " +gm.username+", but they're not to be disturbed.")
            members.delete(gm.id);
        }
        else if (gm.equals(message.author)) {
            console.log("Chose " +gm.username+", but they're the one who requested someone.")
            members.delete(gm.id);
        }
        else {
            console.log("Chose "+gm.username+"!");
            console.log();
            message.channel.send("<@" + gm.id + ">");
            break;
        }
        if (members.size === 0){
            console.log("Nobody to send the message to!");
            console.log();
            break;
        }
        gm = members.random(1)[0].user;
    }
}

function playAudio(file, message){
    let fileToPlay = config.settings.songs + file + ".mp3";
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
            .then(connection => { // Connection is an instance of VoiceConnection
                connection.playFile(fileToPlay);
            })
            .catch(console.log);
    } else {
        message.reply('You need to join a voice channel first!');
    }
}

client.on('message', async message => {
    //debugger
    if (message.author.bot) return; //no bots

    if (message.content.indexOf(config.settings.prefix) === 0) {
        const args = message.content.slice(config.settings.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (config.settings.useMemes && command === "meme") {
            message.channel.send('Here\'s your meme:', {file: config.settings.memes + 'meme('+getRandomIntInclusive(1,config.settings.memeCount)+').jpg'});
            return;
        }

        if (config.settings.useVoice) {
            if (command === "play") playAudio(args[0], message);
            else if (command === "pause") client.voiceConnections.first().dispatcher.pause();
            else if (command === "resume") client.voiceConnections.first().dispatcher.resume();
            else if (command === "stop") client.voiceConnections.first().dispatcher.end();
            else if (command === "leave") {
                let vc = message.member.voiceChannel;
                vc.leave();
            }
        }

        if (command === "anyone"){
            mentionRandomPerson(message, true);
        }
        else if (command === "someone"){
            mentionRandomPerson(message, false);
        }
    }
    else {
        let msg = message.content.toLowerCase();
        if (config.settings.useRawr) {
            if (msg.includes("rawr")) message.channel.send('XD');
            else if (msg.includes("owo")) message.channel.send('What\'s this?');
        }

        if (config.settings.useGaming) {
            if (msg.includes("fortnite")) message.channel.send('Fortnite is not relevant\.');
            else if (msg.includes("gmod") || msg.includes("garry\'s mod") || msg.includes("garrys mod") || msg.includes("g mod")) message.channel.send('Is it really Garry\'s Mod?');
            else if (msg.includes("factorio")) message.channel.send('Good game');
            else if (msg.includes("apex")) message.channel.send('Is Apex the *peak* of gaming?');
        }

    }

});

client.login(config.settings.token);

client.on('ready', () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`);
    client.user.setActivity('God', { type: 'PLAYING' })
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New server joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
