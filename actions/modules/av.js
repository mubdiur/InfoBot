const { MessageEmbed } = require('discord.js')
const findmember = require('./findmember');

module.exports = {
    helptext: "Shows avater",
    getReply: async (msg, text) => {
        return new Promise(async (mResolve) => {
            try {
                const member = await findmember(msg, text)
                if (!member) return;
                const user = member.user;
                reply = new MessageEmbed()
                    .setAuthor(user.tag)
                    .setImage(user.displayAvatarURL({
                        dynamic: true,
                        size: 1024
                    }))

                await msg.channel.send(reply);
                mResolve(null);
            } catch (e) {
                console.log(e)
                mResolve(null)
            }
        })
    }
}