const { MessageEmbed } = require('discord.js')

module.exports = {
    helptext: "Shows avater of the user himself or a mentioned user",
    getReply: (msg, text) => {
        const user = msg.mentions.users.first() || msg.author;
        const embed = new MessageEmbed()
            .setColor('#333333')
            .setAuthor(user.username)
            .setImage(user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
        msg.channel.send(embed)
        return null
    }
}