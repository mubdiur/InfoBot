const DDG = require('duck-duck-scrape');
const { MessageEmbed } = require('discord.js');
const Pagination = require('discord-paginationembed');
const unsafe = require('./unsafe')
const { decode } = require('html-entities');

module.exports = {
     helptext: "Searches on the web.",
     getReply: async (msg, text) => {
          if (unsafe(text)) {
               msg.reply("It is unsafe to search that.");
               return null;
          }
          if (text.trim().length > 0) {

               const results = await DDG.search(text, {
                    safeSearch: DDG.SafeSearchType.STRICT
               });
               const resArray = Array.from(results.results);
               /**
                * for now just show the first one
                */
               const embeds = [];
               let resLen = 11;
               if (resArray.length < 11) resLen = resArray.length + 1
               for (let i = 1; i < resArray.length && i < 11; i++) {

                    const rawDescription = "" + resArray[i].description;
                    const description = rawDescription
                         .split('<b>').join('**')
                         .split('</b>').join('**')
                         .split('(listen)').join('');

                    const embed = new MessageEmbed()
                         .setAuthor(text + ` ${i} of ${resLen - 1}`)
                         .setTitle(decode(resArray[i].title))
                         .setDescription(decode(description))
                         .setURL(resArray[i].url)
                         .setFooter(resArray[i].hostname)
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

