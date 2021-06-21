const { MessageEmbed } = require('discord.js')

module.exports = {
    helptext: "Shows avater of the user himself or a mentioned user",
    getReply: async (msg, text) => {
        const trimmed = text.trim().toLowerCase();
        // if an id is given


        let user = null;


        user = msg.mentions.users.first();

        // if user is null
        if (user === null) {
            if (trimmed.length > 0) {
                const membersObj = await msg.guild.members.fetch();
                const membersLarge = JSON.parse(JSON.stringify(membersObj));
                const members = [];
                for await (member of membersLarge) {
                    const fetchedMember = await msg.guild.members.fetch(member.userID);
                    const tag = fetchedMember.user.tag;
                    const tagpart = tag.toString().split('#')[0].toLowerCase()

                    const memberItem = {
                        id: member.userID,
                        tag: fetchedMember.user.tag.toLowerCase(),
                        tagpart: tagpart.toLowerCase(),
                        nick: member.nickname.toLowerCase(),
                        name: member.displayName.toLowerCase()
                    }
                    members.push(memberItem)
                }


                for await (member of members) {
                    // if the anything matched
                    if (
                        trimmed === member.id ||
                        trimmed === member.tag ||
                        trimmed === member.tagpart ||
                        trimmed === member.nick ||
                        trimmed === member.name
                    ) {
                        const matchedMember = await msg.guild.members.fetch(member.id);
                        user = matchedMember.user;
                    }
                }
            }
        }
        let reply = "User not found in this server!"
        if (user !== null) {
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