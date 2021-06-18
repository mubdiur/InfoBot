const actions = require('../index')
const { MessageEmbed } = require('discord.js')

module.exports = {
    helptext: "Shows this help menu.",
    getReply: (msg, text) => {
        const keys = Object.keys(actions)
        let helpStr = "";
        keys.forEach(key => {
            helpStr += '\n`'+ key +'` - ' + actions[key].helptext;
        })
        return new MessageEmbed()
            .setTitle('Help Menu')
            .setColor('#4b99cc')
            .setDescription(helpStr)
    }
}