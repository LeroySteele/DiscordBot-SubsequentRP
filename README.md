# DiscordBot-SubsequentRP

This is a discord bot for a private FiveM GTA RP server used to automatically manage users, roles and all linked actions.
This bot is registered on Discord Developer Portal, uses mongoDB Atlas Database for online storage and was hosted on Discloud for 24/7 accessibility.
It handles custom slash commands, custom event listeners, an activity based level system and birthday notifications.

### Commands to run in console during setup
- npm init -y
- npm i discord.js
- npm i -D dotenv
- npm i -D nodemon
- npm i discord-html-transcripts
- npm i @discordjs/rest
- npm i @discordjs/builders
- npm i fs
  
## Data folder
Contains the discord ID's for the categories, channels, roles as well as the database login information. 


## Commands folder
Register the slash commands by running 'node deploy-commands.js' in console then they can get used within discord by using a '/' followed by the command name. 


## Events folder
Contains the custom events to preform certain desired actions relating to members joinging/leaving, messege reactions and messeges being sent in certain channels. 
