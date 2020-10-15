require("dotenv").config();
const { Client, Webhook } = require("discord.js");

const client = new Client();
const prefix = "$";

client.on("ready", () => {
    console.log(`${client.user.username} has Logged in!`);
});

client.on("message", async(message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) {
        const [commandName, ...args] = message.content
            .trim()
            .toLowerCase()
            .substring(prefix.length)
            // regular expression to match all spaces
            .split(/\s+/);
        if (commandName === "kick") {
            if (!message.member.hasPermission("KICK_MEMBERS"))
                return message.reply(
                    "You Do not have the clearance to give me that command"
                );
            if (args.length === 0)
                return message.reply(
                    "Please enter the ID of the user you wish to be kicked"
                );
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                    .kick()
                    .then((member) => message.channel.send(`${member} was Kicked`))

                .catch((err) => message.channel.send("I will not kick that User"));
            } else {
                message.reply("Member Not Found");
            }
        } else if (commandName === "ban") {
            if (!message.member.hasPermission("BAN_MEMBERS"))
                return message.reply(
                    "You Do not have the clearance to give me that command"
                );
            if (args.length === 0)
                return message.reply(
                    "Please enter the ID of the user you wish to be banned"
                );
            try {
                const user = await message.guild.member.ban(args[0]);
                message.channel.send(`${member} was Banned`);
            } catch (err) {
                message.channel.send("An Error has Occured . Please try Again");
            }
        }
    }
});

// client.on('messageReactionAdd', (reaction, user) => {
//     const { name } = reaction.emoji;
//     const member = reaction.member.guild.me.cache.get(user.id)
//         // id missing
//     if (reaction.member.id === "123456789") {
//         switch (name) {
//             case ::mechanic::mechanic:
//         }

//     }
// })

client.login(process.env.TOKEN);