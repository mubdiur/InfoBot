const actions = require('../index')
const { MessageEmbed } = require('discord.js')

module.exports = {
    helptext: "Shows the help menu with commands",
    getReply: (msg, text) => {
        const keys = Object.keys(actions)
        let helpStr = "";
        keys.forEach(key => {
            helpStr += '\n`'+ key +'` - ' + actions[key].helptext;
        })
        return new MessageEmbed()
            .setTitle('Help Menu')
            .setColor('#888888')
            .setDescription(helpStr)
    }
}