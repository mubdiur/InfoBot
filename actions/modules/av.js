const { MessageEmbed } = require('discord.js')
const findmember = require('./findmember');

module.exports = {
    helptext: "Shows avater",
    getReply: async (msg, text) => {
        const member = await findmember(msg, text)
        if (!member) return;
        const user = member.user;
        reply = new MessageEmbed()
            .setColor("#252525")
            .setAuthor(user.tag)
            .setImage(user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))

        msg.channel.send(reply);


        return null;
        // msg.channel.send(embed)
        // return null
    }
}