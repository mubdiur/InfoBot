const actions = require('../index')
const { MessageEmbed } = require('discord.js')
const findmember = require('./findmember');
const randomHexColor = require("random-hex-color")
module.exports = {
    helptext: "Shows permissions",
    getReply: async (msg, text) => {
        const member = await findmember(msg, text);
        if (!member) return null;
        const len = member.permissions.toArray().length;
        const half = Math.ceil(len / 2);
        reply = new MessageEmbed()
            .setColor(randomHexColor())
            .setAuthor("User - " + member.user.tag)
            .setTitle('Total - ' + member.permissions.toArray().length)


        if (len > 1) {
            reply.addField('Permissions', member.permissions.toArray().slice(0, half).join("\n"), true)
                .addField('\u200B', member.permissions.toArray().slice(half, len).join("\n"), true)
        } else {

            reply.addField('Permissions', member.permissions.toArray().join("\n"), true)
        }

        msg.channel.send(reply);


        return null;
        // msg.channel.send(embed)
        // return null
    }
}