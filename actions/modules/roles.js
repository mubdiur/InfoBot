const { MessageEmbed } = require('discord.js')
const findmember = require('./findmember');
const randomHexColor = require("random-hex-color")
module.exports = {
    helptext: "Shows roles",
    getReply: async (msg, text) => {
        return new Promise(async (mResolve) => {
            try {
                const member = await findmember(msg, text);
                if (!member) return null;

                const roles = member.roles.cache;

                if (!roles) {
                    msg.reply("User has no roles!");
                    return null;
                }
                let rolesdes = "";
                let len = 0;
                for (const role of roles) {
                    rolesdes += "`" + role[1].id + "` - `" + role[1].name + "`\n";
                    len++;
                }

                reply = new MessageEmbed()
                    .setColor(randomHexColor())
                    .setAuthor("User - " + member.user.tag)
                    .setTitle('Total - ' + len)
                    .setDescription(rolesdes)




                await msg.channel.send(reply);


                mResolve(null)
            } catch (e) {
                console.log(e)
                mResolve(null)
            }
        })
    }
}