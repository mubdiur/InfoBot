const { MessageEmbed } = require('discord.js');
const Pagination = require('discord-paginationembed');
const unsafe = require('./unsafe')
const Owl = require('owlbot-js')




const dictionary = Owl(process.env.OWL_TOKEN);


module.exports = {
    helptext: "Shows definitions",
    getReply: async (msg, text) => {
        if (unsafe(text)) {
            msg.reply("It is unsafe to search that.");
            return null;
        }
        if (text.trim().length > 0) {
            let results = null;
            let resArray = null;

            try {
                results = await dictionary.define(text);
                resArray = Array.from(results.definitions);
            } catch (e) { }
            
            if (!results || !resArray) {
                msg.reply('The term was not found!');
                return null;
            }
            
            
            
            /**
             * for now just show the first one
             */
            
            
            const embeds = [];
            let resLen = 10;
            if (resArray.length < 10) resLen = resArray.length
            for (let i = 0; i < resArray.length && i < 10; i++) {
                const embed = new MessageEmbed()
                    .setAuthor(text + ` ${i + 1} of ${resLen}`)
                    .addField('Definition', resArray[i].definition)
                    .addField('Type', resArray[i].type);
                if (resArray[i].example) {
                    const example = resArray[i].example
                        .split('<b>').join('')
                        .split('</b>').join('');
                    embed.addField('Example', "*`" + example + "`*")
                }
                embeds.push(embed)
            }
            if (embeds.length < 1) {
                msg.reply('No results found for that search term!');
            } else {
                new Pagination.Embeds()
                    .setArray(embeds)
                    .setChannel(msg.channel)
                    .setDisabledNavigationEmojis(['delete', 'jump'])
                    .setNavigationEmojis({
                        back: '⬅️',
                        forward: '➡️'
                    })
                    .setTimeout(180000)
                    .build()
            }
        }
        return null;
    }
}