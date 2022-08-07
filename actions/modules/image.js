const gis = require('g-i-s');
const { MessageEmbed } = require('discord.js');
const Pagination = require('discord-paginationembed');
const unsafe = require('./unsafe')

module.exports = {
     helptext: "Searches for images on the web",
     getReply: async (msg, text) => {
          if (!msg.channel.nsfw && unsafe(text)) {
               msg.reply("It is unsafe to search that. Please use an NSFW channel.");
               return null;
          }
          if (text.trim().length > 0) {
               /**
                * Get the search result
                */
               gis({
                    searchTerm: text,
                    queryStringAddition: (msg.channel.nsfw) ?  '' : '&safe=active'
               }, (error, results) => {
                    if (error) {
                         console.log(error);
                    }
                    else {
                         const links = Array.from(results).map(each => each.url)
                         /**
                          * for now just show the first one
                          */
                         const embeds = [];
                         let linkslen = 10;
                         if (links.length < 10) linkslen = links.length
                         for (let i = 0; i < links.length && i < 10; i++) {
                              const embed = new MessageEmbed()
                                   .setAuthor(text + ` ${i + 1} of ${linkslen}`)
                                   .setImage(links[i])
                              embeds.push(embed)
                         }
                         if (embeds.length < 1) {
                              msg.reply('No image found for that search term!');
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
               });

          }
          return null;
     }
}
