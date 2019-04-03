# RawrBot
---
```
 ________  ________  ___       __   ________  ________  ________  _________         _______      ________     
|\   __  \|\   __  \|\  \     |\  \|\   __  \|\   __  \|\   __  \|\___   ___\      /  ___  \    |\   __  \    
\ \  \|\  \ \  \|\  \ \  \    \ \  \ \  \|\  \ \  \|\ /\ \  \|\  \|___ \  \_|     /__/|_/  /|   \ \  \|\  \   
 \ \   _  _\ \   __  \ \  \  __\ \  \ \   _  _\ \   __  \ \  \\\  \   \ \  \      |__|//  / /    \ \  \\\  \  
  \ \  \\  \\ \  \ \  \ \  \|\__\_\  \ \  \\  \\ \  \|\  \ \  \\\  \   \ \  \         /  /_/__  __\ \  \\\  \ 
   \ \__\\ _\\ \__\ \__\ \____________\ \__\\ _\\ \_______\ \_______\   \ \__\       |\________\\__\ \_______\
    \|__|\|__|\|__|\|__|\|____________|\|__|\|__|\|_______|\|_______|    \|__|        \|_______\|__|\|_______|                           
```                                                                          
                                                                  
RawrBot 2.0 is a rewrite of a discord bot that when someone on your server says rawr, it responds with "XD", among other things. It requires [Node.js](https://nodejs.org/en/download/ "Node.js Download") and [discord.js](https://github.com/discordjs/discord.js "discord.js").
***
### Installation
To install, first download and unzip all the files. Next, Head over to the [applicatons page](https://discordapp.com/developers/applications/me).

Click “new application”. Give it a name, like RawrBot, picture and description.

Click “Create Bot User” and click “Yes, Do It!” when the dialog pops up.

Next, invite your bot to your server. Don't worry about the bot running for this next step. Replace YOUR_CLIENT_ID_HERE in this URL ```https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0``` with the Client ID from the bot's page under App Details, then paste the link into your browser. You should then select a server, and click authorize.

Go back to the bot's application page, and copy down the bot's token. You'll need this later.

Next, open config.json in your favorite text editor.
Edit "token" so that "\<Your Token Here\>" is replaced by your token. Make sure to keep the quotation marks.

***
### Configuration options

If you want the bot to send memes, put the directory to the memes under "memes" and "memeCount" to the amount of memes you have. Then, change "useMemes" to ```true```. If you want to play songs, put the songs directory under "songs". Note that this requires either [node-opus](https://www.npmjs.com/package/node-opus) or [opusscript](https://www.npmjs.com/package/opusscript), and [ffmpeg](https://www.npmjs.com/package/ffmpeg). Then, change "useVoice" to ```true```.

If you need any help, just message me.
***
### Starting the bot
All you have to do to start the bot is type in `node bot.js` in the command line. If everything worked, you should see a message that looks like ```Bot has started, with X users, in Y channels of Z servers.```
