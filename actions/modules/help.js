const actions = require('../index')
const { MessageEmbed } = require('discord.js')
const randomHexColor = require("random-hex-color")
module.exports = {
    helptext: "Shows this help menu.",
    getReply: (_1, _2) => {
        return new Promise(async (mResolve) => {
            try {
                const keys = Object.keys(actions)
                let helpStr = "";
                keys.forEach(key => {
                    helpStr += '\n`' + key + '` - ' + actions[key].helptext;
                })
                const messageEmbed = new MessageEmbed()
                    .setTitle('Help Menu')
                    .setColor(randomHexColor())
                    .setDescription(helpStr);

                mResolve(messageEmbed)
            } catch (e) {
                console.log(e)
                mResolve(null)
            }
        })
    }
}