const { MessageEmbed } = require('discord.js')
const finduser = require('./finduser');

module.exports = {
    helptext: "Shows avater of the user himself or a mentioned user",
    getReply: async (msg, text) => {
        const user = await finduser(msg, text)
        let reply = "User not found in this server!"
        if (user) {
            reply =  new MessageEmbed()
            .setColor('#333333')
            .setAuthor(user.tag)
            .setImage(user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))

            msg.channel.send(reply);
        } else {
            msg.lineReply(reply);
        }

        return null;
        // msg.channel.send(embed)
        // return null
    }
}