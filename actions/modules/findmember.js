module.exports = async (msg, text) => {
    return new Promise(async (mResolve) => {
        try {

            const trimmed = text.trim().toLowerCase();
            // if an id is given
            let mm = null;


            mm = msg.mentions.users.first();
            if (mm) mm = await msg.guild.members.fetch(mm.id)
            // if user is null
            if (!mm) {
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
                            nick: member.nickname ? member.nickname.toLowerCase() : null,
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
                            mm = await msg.guild.members.fetch(member.id);
                        }
                    }
                } else {
                    mm = await msg.guild.members.fetch(msg.author.id);
                }
            }

            if (!mm) {
                await msg.lineReply("User not found!");
                mResolve(null)
            } else
                mResolve(mm)
        } catch (e) {
            console.log(e);
            mResolve(null)
        }
    })
}