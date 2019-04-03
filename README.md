# RawrBot
---
```
 ________  ________  ___       __   ________  ________  ________  _________   
|\   __  \|\   __  \|\  \     |\  \|\   __  \|\   __  \|\   __  \|\___   ___\ 
\ \  \|\  \ \  \|\  \ \  \    \ \  \ \  \|\  \ \  \|\ /\ \  \|\  \|___ \  \_| 
 \ \   _  _\ \   __  \ \  \  __\ \  \ \   _  _\ \   __  \ \  \\\  \   \ \  \  
  \ \  \\  \\ \  \ \  \ \  \|\__\_\  \ \  \\  \\ \  \|\  \ \  \\\  \   \ \  \ 
   \ \__\\ _\\ \__\ \__\ \____________\ \__\\ _\\ \_______\ \_______\   \ \__\
    \|__|\|__|\|__|\|__|\|____________|\|__|\|__|\|_______|\|_______|    \|__|
```                                                                          
                                                                              
## Warning: This bot is about to become depreciated, pending a complete rewrite of the command logic to get away from regex.                                                                            
RawrBot is a discord bot that when someone on your server says rawr, it responds with "XD", among other things. It requires [Node.js](https://nodejs.org/en/download/ "Node.js Download") and [discord.js](https://github.com/discordjs/discord.js "discord.js").
***
### Installation
To install, first download the two files, package.json and bot.js. Next, Head over to the [applicatons page] (https://discordapp.com/developers/applications/me).

Click “new application”. Give it a name, like RawrBot, picture and description.

Click “Create Bot User” and click “Yes, Do It!” when the dialog pops up.

Next, invite your bot to your server. Don't worry about the bot running for this next step. Replace YOUR_CLIENT_ID_HERE in this URL https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0 with the Client ID from the bot's page under App Details, then paste the link into your browser. You should then select a server, and click authorize.

Go back to the bot's application page, and copy down the bot's token. You'll need this later.

Next, open bot.js in your favorite text editor.
Edit the line at the very bottom so that the words `Your Token Here` are replaced by your token. Make sure to keep the quotation marks.

(OPTIONAL) If you want the bot to respond to anyone @ing someone, replace `User ID Here (Optional)` with the user of who you want it to be triggered on.
***
### Configuration options
If you want the bot to respond to anyone @ing someone, replace `User ID Here (Optional)` with the user of who you want it to be triggered on, and uncomment that line.

If you want the bot to send a meme when someone mentions the bot, replace `Bot ID Here (Optional)` with the ID of the bot. You also have to change the value of the variable memes to how many you have, and change the address of the memes.

If you want the bot to respond to an @everyone, then uncomment the last `else if` that is commented.

If you need any help, just message me.
***
### Starting the bot
All you have to do to start the bot is type in `node bot.js` in the command line. If everything worked
