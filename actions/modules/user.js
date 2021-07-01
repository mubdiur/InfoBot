const actions = require('../index')
const { MessageEmbed } = require('discord.js')
const findmember = require('./findmember');
const randomHexColor = require("random-hex-color")
module.exports = {
    helptext: "Shows user information",
    getReply: async (msg, text) => {
        const member = await findmember(msg, text);
        if (!member) return null;
        const user = member.user;
        reply = new MessageEmbed()
            .setColor(randomHexColor())
            .setTitle('User Info')
            .setThumbnail(user.displayAvatarURL({
                dynamic: true,
                size: 512
            }))
            .addField('Tag', user.tag, true)
            .addField('Username', user.username, true)

        if (member.nickname) reply.addField('Nick Name', member.nickname, true);
        reply.addField('Presence', user.presence.status, true)
            .addField('Bot', user.bot, true);
        // .addField('Roles', member.roles.toString(), true)
        if (member.premiumSince) reply.addField('Boosting Since', member.premiumSince, true);
        // .addField('Flags', JSON.stringify(user.flags), true)
        reply.addField('Partial', user.partial, true);

        if (user.flags && user.flags.toArray().length > 0)
            reply.addField('Flags', user.flags.toArray().join(", "), true);
        // reply.addField('Deleted from Server', member.deleted)
        reply.addField('ID', user.id);
        reply.addField('Joined Discord', user.createdAt.toDateString(), true)
            .addField('Joined Server', member.joinedAt.toDateString(), true)
        // .addField('System', user.system, true)
        // .addField('Permissions', member.permissions.toArray().join(', '), true)




        msg.channel.send(reply);


        return null;
        // msg.channel.send(embed)
        // return null
    }
}