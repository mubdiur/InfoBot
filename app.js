require('discord-reply');
const Discord = require('discord.js');

const { keepAlive } = require('./keepAlive');



/**
 * Discord Client
 */

 const client = new Discord.Client();

 client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}!`);
 });
 
 client.on('message', msg => {
   if (msg.content === 'ping') {
     msg.lineReply('pong');
   }
 });
 
 client.login(process.env.BOT_TOKEN);





keepAlive()