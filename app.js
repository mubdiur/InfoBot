require('discord-reply');
const Discord = require('discord.js');

const { keepAlive } = require('./keepAlive');
const actions = require('./actions')


/**
 * Discord Client
 */
let intents = new Discord.Intents(Discord.Intents.NON_PRIVILEGED);
intents.add('GUILD_MEMBERS');

const client = new Discord.Client({ ws: { intents: intents } });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('info help', { type: 'WATCHING' })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
});

client.on('message', async (msg) => {
    // ignore bot messages
    if (msg.author.bot) return;
    // ignore dm messages
    if (msg.channel.type === 'dm') return;

    const lower = msg.content.toLocaleLowerCase().trim();
    if (lower === 'ping') {
        msg.lineReply('Pong');
        return;
    }
    if (lower.startsWith('info')) {
        const prefixless = msg.content.substr(4).trim()
        const prefixlesslower = msg.content.substr(4).trim()
        /**
         * get the keys
         */
        const keys = Object.keys(actions)
        const matched = keys.filter(key => prefixlesslower.startsWith(key));

        /**
         * sort matched by string length
         */
        if (matched.length != 0) {
            const command = matched.sort((a, b) => {
                return b.length - a.length
            })[0]

            const commandless = prefixless.substr(command.length).trim()
            const reply = await actions[command].getReply(msg, commandless)
            if (reply !== null) msg.lineReply(reply)
        }
    }
});

client.login(process.env.BOT_TOKEN);
keepAlive()