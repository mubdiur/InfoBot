const actions = require('../index')
const { MessageEmbed } = require('discord.js')
const findmember = require('./findmember');

module.exports = {
    helptext: "Shows roles",
    getReply: async (msg, text) => {
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
            .setColor('#333333')
            .setAuthor("User - " + member.user.tag)
            .setTitle('Total - ' + len)
            .setDescription(rolesdes)




        msg.channel.send(reply);



        //! test test test

        // msg.lineReplyNoMention("```" + JSON.stringify(rolesArray, null, "  ") + "```");

        //! end of test

        return null;
        // msg.channel.send(embed)
        // return null
    }
}