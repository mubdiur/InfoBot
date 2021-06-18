module.exports = {
    helptext: "Replies pong when user says `info ping`",
    getReply: (msg, text) => {
        return 'Pong'
    }
}