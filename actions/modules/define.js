const { MessageEmbed } = require('discord.js');
const Pagination = require('discord-paginationembed');
const unsafe = require('./unsafe')
const got = require('got')




module.exports = {
    helptext: "Shows definitions",
    getReply: async (msg, text) => {
        if (!msg.channel.nsfw && unsafe(text)) {
            msg.reply("It is unsafe to search that. Please use an NSFW channel.");
            return null;
        }
        if (text.trim().length > 0) {
            let results = null;
            let resArray = null;

            try {
                results = await got(`https://api.dictionaryapi.dev/api/v2/entries/en_US/`
                    + text.split(' ').join('').trim());

                resArray = Array.from(JSON.parse(results.body));
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

                let definitions = resArray[i].phonetics
                    .map(ph => ph.text).join(", ") + "\n\n";
                
                const meanings = resArray[i].meanings;
                
                for (const meaning of meanings) {
                    
                    definitions += "***" + meaning.partOfSpeech + ":***\n";
                    
                    for (const defn of meaning.definitions) {
                        for (const [key, value] of Object.entries(defn)) {
                            if (key === 'example') definitions += `*\`${value}\`*` + "\n";
                            else definitions += value + "\n";
                        }
                        definitions += "\n";
                    }
                }
                
                const embed = new MessageEmbed()
                    .setFooter(text + ` ${i + 1}/${resLen}`)
                    .setTitle(resArray[i].word)
                    .setDescription(definitions);
                
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