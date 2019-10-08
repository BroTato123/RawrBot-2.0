const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const ytdl = require("ytdl-core");

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function mentionRandomPerson(message, onlyOnline){
    let guild = message.guild;
    let members = guild.members;
    let gm = members.random(1)[0].user;

    while (true){
        if (gm.bot) {
            console.log("Chose " + gm.username + ", but they're a bot.");
            members.delete(gm.id);
        }
        else if (gm.presence.status === "offline" && onlyOnline) {
            console.log("Chose " +gm.username+", but they're offline.");
            members.delete(gm.id);
        }
        else if (gm.presence.status === "dnd" && onlyOnline) {
            console.log("Chose " +gm.username+", but they're not to be disturbed.");
            members.delete(gm.id);
        }
        else if (gm.equals(message.author)) {
            console.log("Chose " +gm.username+", but they're the one who requested someone.");
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

function queueAudio(video, message){
    let vC = undefined;
    let info = undefined;

    try {
        config.music.queue.push(ytdl(video, {filter: 'audioonly'}));
    }
    catch(err){
        message.channel.send("That was either an invalid video or a playlist.");
    }

    if (config.music.queue.length > 1 || config.music.playing) {
        ytdl.getBasicInfo(video).then(v => {
            info = v.player_response.videoDetails.title.toString();
            message.channel.send("Queued " + info + ".");
            config.music.titles.push(info)
        });
    }
    else {
        ytdl.getBasicInfo(video).then( v => {
            info = v.player_response.videoDetails.title.toString();
            message.channel.send("Playing " + info + ".")});
    }
    //debugger;
    //console.log(config.music.playing);
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join();
        if (!config.music.playing) {
            vC = client.voiceConnections.first();
            //
            jukeBox(vC);
        }
    } else {
        message.channel.send("You need to join a voice channel first!");
    }

}
function endOfStream(broadcast) {
    console.log("Stream ended, playing next song.");
    config.music.playing = false;
    jukeBox(broadcast);
}

function jukeBox(broadcast){
    if (config.music.queue.length === 0) { config.music.playing = false; return;}
    else if (!config.music.playing){
        config.music.playing = true;
        //console.log(config.music.playing);
        broadcast.playStream(config.music.queue.shift()).on("end", v => { endOfStream(broadcast);});
        broadcast.dispatcher.setVolume(config.music.volume/100.0);
        config.music.titles.shift();
    }
    return;
}

client.on('message', async message => {
    //debugger
    if (message.author.bot) return; //no bots

    if (message.content.indexOf(config.settings.prefix) === 0) {
        const args = message.content.slice(config.settings.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (command === "help"){
            let outMessage = "";
            outMessage += "Commands:```";
            if (config.settings.useVoice) {
                outMessage += (config.settings.prefix + "play: Plays a youtube link.\n");
                outMessage += (config.settings.prefix + "pause: Pauses the player.\n");
                outMessage += (config.settings.prefix + "resume: Resumes playback.\n");
                outMessage += (config.settings.prefix + "skip: Skips the current song.\n");
                outMessage += (config.settings.prefix + "leave: Leaves the voice channel.\n");
            }
            if(config.settings.useMemes){
                outMessage += (config.settings.prefix + "meme: Sends a meme in the channel\n");
            }
            outMessage += (config.settings.prefix + "anyone: Mentions anyone, even if they're offline.\n");
            outMessage += (config.settings.prefix + "someone: Mentions only people who are online.```");
            message.channel.send(outMessage);
        }

        if (config.settings.useMemes && command === "meme") {
            message.channel.send('Here\'s your meme:', {file: config.settings.memes + 'meme('+getRandomIntInclusive(1,config.settings.memeCount)+').jpg'});
            return;
        }

        if (config.settings.useVoice) {
            if (command === "play") {
                let fileToPlay = "";
                for (let ii in args){
                    fileToPlay += args[ii];
                }
                queueAudio(fileToPlay, message);
                //message.channel.send("Playing "+fileToPlay+".");
                if (config.settings.logging) console.log(message.member.nickname +" requested the file "+fileToPlay);
                return;
            }
            else if (command === "pause") {
                client.voiceConnections.first().dispatcher.pause();
                message.channel.send("Paused. Use resume to continue playing.")
            }
            else if (command === "resume") client.voiceConnections.first().dispatcher.resume();
            else if (command === "skip") client.voiceConnections.first().dispatcher.end();
            else if (command === "leave") {
                let vc = message.member.voiceChannel;
                vc.leave();
                return;
            }
            else if (command === "volume") {
                let volume = args[0];
                config.settings.volume = volume;
                client.voiceConnections.first().dispatcher.setVolume(volume/100.0);
                if (volume > 100) message.channel.send("Volume set to "+volume+". `Warning: the audio may clip at this level.`");
                else message.channel.send("Volume set to "+volume+".");
                if (config.settings.logging) console.log(message.member.nickname +" changed the volume to " + config.settings.volume);
                return;
            }
            else if (command === "queue") {
                let outMessage = "";
                outMessage += "Queue:\n\n";
                for (let ii = 0; ii < config.music.titles.length; ii++) {
                    outMessage += ((ii + 1).toString() + ": " + config.music.titles[ii] + "\n");
                }
                message.channel.send(outMessage);
            }
            else {}
        }

        if (command === "anyone"){
            mentionRandomPerson(message, false);
            return;
        }
        else if (command === "someone"){
            mentionRandomPerson(message, true);
            return;
        }
        if (command === "prefix"){
            config.settings.prefix = args[0];
            return;
        }
    }
    else {
        let msg = message.content.toLowerCase();

        if (msg.includes("##")) return;

        if (message.isMentioned(client.users.get("435060306197086219"))) message.channel.send("That's me!");

        if (config.settings.useRawr) {
            if (msg.includes("rawr")) message.channel.send('XD');
            else if (msg.includes("owo")) message.channel.send('What\'s this?');
        }

        if (config.settings.useGaming) {
            if (msg.includes("fortnite")) message.channel.send('Fortnite is not relevant\.');
            else if (msg.includes("gmod") || msg.includes("garry\'s mod") || msg.includes("garrys mod") || msg.includes("g mod")) message.channel.send('Is it really Garry\'s Mod?');
            else if (msg.includes("factorio") && msg.includes("satis")) message.channel.send('The unholy combination');
            else if (msg.includes("satisfactory")) message.channel.send("Factorio 2: Electric Boogaloo");
            else if (msg.includes("factorio")) message.channel.send("Good game");
            else if (msg.includes("apex")) message.channel.send('Apex is not the *peak* of gaming');
            else if (msg.includes("minecraft")) message.channel.send('Minecraft is the *peak* of gaming');
            else if (msg.includes("mother russia")) message.channel.send('Союз нерушимый республик свободных Сплотила навеки Великая Русь. Да здравствует созданный волей народов Единый, могучий Советский Союз! Славься, Отечество наше свободное, Дружбы, народов надежный оплот! Знамя советское, знамя народное Пусть от победы, к победе ведет! Сквозь грозы сияло нам солнце свободы, И Ленин великий нам путь озарил. Нас вырастил Сталин - на верность народу На труд и на подвиги нас вдохновил. Славься, Отечество чаше свободное, Счастья народов надежный оплот! Знамя советское, знамя народное Пусть от победы к победе ведет! Skvoz grozy siialo nam solntse svobody, I Lenin velikij nam put ozaril. Nas vyrastil Stalin - na vernost narodu Na trud i na podvigi nas vdokhnovil. Slavsia, Otechestvo chashe svobodnoe, Schastia narodov nadezhnyj oplot! Znamia sovetskoe, znamia narodnoe Pust ot pobedy k pobede vedet! Мы армию нашу растили в сраженьях, Захватчиков подлых с дороги сметем! Мы в битвах решаем судьбу поколений, Мы к славе Отчизну свою поведем! Славься, Отечество наше свободное, Славы народов надежный оплот! Знамя советское, знамя народное Пусть от победы к победе ведет!');
        }
    }
});

client.login(config.settings.token);

client.on('ready', () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`);
    console.log('Using memes: '+config.settings.useMemes);
    console.log('Using gaming: '+config.settings.useGaming);
    console.log('Using voice: '+config.settings.useVoice);
    console.log('Using rawr: '+config.settings.useRawr);
    console.log('Using logging: '+ config.settings.logging);
    console.log();
    client.user.setActivity('God', { type: 'PLAYING' });
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New server joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
