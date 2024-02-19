require('dotenv/config');
const { bot_token } = require('./config');
const Discord = require('discord.js')
const client = new Discord.Client({
  intents: ['Guilds', 'GuildMessages', 'MessageContent'] // Intents
})

// Import commands
const play = require('./commands/play.js');
const vcmodule = require('./commands/vc.js');
// 関数を使用するときは、 vcmodule.vcjoin(); とか。



/*----------------------------------------------------------------------------
BOT command handling
-----------------------------------------------------------------------------*/

const prefix = '!'

client.on('messageCreate', async message => {
 if (!message.content.startsWith(prefix)) return
 const [command, ...args] = message.content.slice(prefix.length).split(/\s+/)
  if (command === 'join') vcmodule.vcjoin();
  if(command === 'leave') vcmodule.vcleave();
  if (command === 'play') play(args);
})






client.login(bot_token)
client.once(Discord.Events.ClientReady, readyClient => {
  console.log(`Discord bot is ready! Logged in as ${readyClient.user.tag}`);
});

module.exports = client;