const Discord = require('discord.js');
const client = new Discord.Client();

const regex1 = RegExp('FORTNITE');
const regex2 = RegExp('RAWR');
const regex3 = RegExp('OWO');
const regex4 = RegExp('MEME PLEASE');
const regex5 = RegExp('GMOD');
const regex6 = RegExp('GARRY\'S MOD');
const regex7 = RegExp('GARRYS MOD');
const regex8 = RegExp('FACTORIO');
const regex9 = RegExp('CRACKTORIO');
const regex10 = RegExp('##');
const regex11 = RegExp('WE LIKE TO PARTY');
const regex12 = RegExp('CRAB.ROLEPLAY');
const regex13 = RegExp('NEITHER.KNOW');
const regex14 = RegExp('TWO.TYPES');
const regex15 = RegExp('RAWRBOT');
const regex16 = RegExp('APEX');
const regex17 = RegExp('/ANYONE');
const regex18 = RegExp('/SANS');
const regex19 = RegExp('/STOP');
const regex20 = RegExp('/PAUSE');
const regex21 = RegExp('/RESUME');
//const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
// 'client.on('message')' commands are triggered when the
// specified message is read in a text channel that the bot is in.

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function mentionRandomPerson(message){
    let guild = message.guild;
    let members = guild.members;
    let gm = members.random(1)[0].user;

    while (true){
        if (gm.bot) {
            console.log("Chose " + gm.username + ", but they're a bot.");
            members.delete(gm.id);
        }
        else if (gm.presence.status === "offline") {
            console.log("Chose " +gm.username+", but they're offline.")
            members.delete(gm.id);
        }
        else if (gm.presence.status === "dnd") {
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

function testMessage(message, regex){
    return regex.test(message.content.toUpperCase());
}

function playAudio(file, message){
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
            .then(connection => { // Connection is an instance of VoiceConnection
                connection.playFile(file);
            })
            .catch(console.log);
    } else {
        message.reply('You need to join a voice channel first!');
    }
}

client.on('message', message => {
    //console.log(message.content);
    if (message.author.bot === false) {
        if(regex10.test(message.content) === false) {
            if ((regex2.test((message.content).toUpperCase()) === true) && (regex15.test((message.content).toUpperCase()) === false)) {
                message.channel.send('XD');
            }

            else if (regex1.test((message.content).toUpperCase()) === true) {
                console.log(message.author.nickname);
                message.channel.send('Fortnite is not relevant\.');
            }

            else if (regex3.test((message.content).toUpperCase()) === true) {
                message.channel.send('What\'s this?');
            }

            else if ((regex5.test((message.content).toUpperCase()) === true)||(regex6.test((message.content).toUpperCase()) === true)||(regex7.test((message.content).toUpperCase()) === true)){
                console.log(message.author.nickname);
                message.channel.send('Is it really Garry\'s mod\?');
            }

            else if ((regex8.test((message.content).toUpperCase()) === true)||(regex9.test((message.content).toUpperCase()) === true)) {
                console.log(message.author.nickname);
                message.channel.send('good game choice');
            }

            else if ((regex12.test((message.content).toUpperCase()) === true)||(regex13.test((message.content).toUpperCase()) === true)||(regex14.test((message.content).toUpperCase()) === true)) {
                message.delete();
            }

            else if (regex11.test((message.content).toUpperCase())) {
                message.channel.send('ha you just got venga bussed');
            }

            else if (regex16.test((message.content).toUpperCase())) {
                console.log(message.author.username);
                message.channel.send('Is Apex the *peak* of gaming?');
            }

            else if (regex17.test((message.content).toUpperCase())) {
                mentionRandomPerson(message);
            }

            else if (testMessage(message, regex18)) {
                playAudio("D:\\Desktop\\music\\megalovania.mp3", message);
            }

            else if (testMessage(message, regex19)){
                let vc = message.member.voiceChannel;
                vc.leave();
            }
            else if (testMessage(message, regex20)){
                client.voiceConnections.first().dispatcher.pause();

            }
            else if (testMessage(message, regex21)){
                client.voiceConnections.first().dispatcher.resume();
            }
            else {}
        }
        else {}
    }


});

client.login("YOUR TOKEN HERE");

client.on('ready', () => {
    client.user.setActivity('God', { type: 'PLAYING' })
});
