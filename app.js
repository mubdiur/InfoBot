require("discord-reply");
const Discord = require("discord.js");

const { keepAlive } = require("./keepAlive");
const actions = require("./actions");
const { MessageEmbed } = require("discord.js");
const LanguageDetect = require("languagedetect");
const lngDetector = new LanguageDetect();
const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");
/**
 * Discord Client
 */
let intents = new Discord.Intents(Discord.Intents.NON_PRIVILEGED);
intents.add("GUILDS", "GUILD_PRESENCES", "GUILD_MEMBERS");

const client = new Discord.Client({ ws: { intents: intents } });

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user
        .setActivity("info help", { type: "WATCHING" })
        .then((presence) =>
            console.log(`Activity set to ${presence.activities[0].name}`)
        )
        .catch(console.error);
});

client.on("message", async (msg) => {
    // ignore bot messages
    if (msg.author.bot) return;
    // ignore dm messages
    if (msg.channel.type === "dm") return;

    const lower = msg.content.toLocaleLowerCase().trim();
    if (lower === "ping") {
        msg.lineReply("Pong");
        return;
    }
    if (lower.startsWith("info")) {
        const prefixless = msg.content.substr(4).trim();
        const prefixlesslower = msg.content.substr(4).toLowerCase().trim();
        /**
         * get the keys
         */
        const keys = Object.keys(actions);
        const matched = keys.filter((key) => prefixlesslower.startsWith(key));

        /**
         * sort matched by string length
         */
        if (matched.length != 0) {
            const command = matched.sort((a, b) => {
                return b.length - a.length;
            })[0];

            const commandless = prefixless.substr(command.length).trim();
            const reply = await actions[command].getReply(msg, commandless);
            if (reply !== null) msg.lineReply(reply);
        }
    } else {
        if (msg.channel.id !== "954077373794492496") return;

        const lang = lngDetector.detect(msg.content, 1)[0][0];

        if (lang === "english") return;

        const languageTranslator = new LanguageTranslatorV3({
            version: "{version}",
            authenticator: new IamAuthenticator({
                apikey: process.env.TRANSLATOR_API_KEY,
            }),
            serviceUrl: process.env.TRANSLATOR_API_URL,
        });
        languageTranslator
            .translate({
                text: msg.content,
                source: "tr",
                target: "en",
            })
            .then((response) => {
                reply = new MessageEmbed()
                    .setAuthor({
                        name: msg.author.tag,
                        iconURL: msg.author.displayAvatarURL({
                            dynamic: true,
                            size: 1024,
                        }),
                    })
                    .setDescription(response.translations[0].translation);
                msg.channel.send(reply);
                console.log(JSON.stringify(response.result, null, 2));
            })
            .catch((err) => {
                console.log("error: ", err);
            });
    }
});

client.login(process.env.BOT_TOKEN);
keepAlive();
