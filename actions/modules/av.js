const { MessageEmbed } = require('discord.js')

module.exports = {
    helptext: "Shows avater of the user himself or a mentioned user",
    getReply: (msg, text) => {
        const user = msg.mentions.users.first() || msg.author;
        const embed = new MessageEmbed()
            .setColor('#333333')
            .setAuthor(user.username)
            .setImage('https://cdn.discordapp.com/avatars/'
                + user.id
                +'/' + user.avatar +'.png?size=1024')
        msg.channel.send(embed)
        return null
    }
}