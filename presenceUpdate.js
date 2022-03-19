const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = async(manager, oldPresence, newPresence) => {

    if (!oldPresence || !newPresence) return;
    if (oldPresence.status === newPresence.status) return;
    if (newPresence.userId !== "YOUR_DISCORD_BOT_ID") return;

    const channel = oldPresence.guild.channels.cache.find(chan => chan.id === "YOUR_CHANNEL_LOGGING_ID") || null;
    const bot = manager.users.cache.get("YOUR_DISCORD_BOT_ID");
    const incidentDate = moment().format('LLL')

    if (channel !== null) {
        if (newPresence.status === 'offline') {
            const botSleeping = new MessageEmbed()
                .setThumbnail('https://i.imgur.com/l2HornC.png')
                .setTitle(`Application: BOT_NAME`)
                .setDescription(`BOT_NAME has gone offline unexpectedly. Developers are aware!`)
                .addField(`Incident Date/Time`, `${incidentDate}`)
                .setColor("#E2574C")
            channel.send({ embeds: [botSleeping] })
        } else if (newPresence.status === 'online') {
            const botAwoken = new MessageEmbed()
                .setThumbnail('https://i.imgur.com/s1GZ8ah.png')
                .setTitle(`Application: BOT_NAME`)
                .setDescription(`BOT_NAME is now back online and ready to serve your server!`)
                .addField(`Incident Date/Time`, `${incidentDate}`)
                .setColor("#3DB39E")
            channel.send({ embeds: [botAwoken] })
        } else if (newPresence.status === 'dnd') {
            const botDownTime = new MessageEmbed()
                .setThumbnail('https://i.imgur.com/l2HornC.png')
                .setTitle(`Application: BOT_NAME`)
                .setDescription(`BOT_NAME has stopped working due to an internal error!`)
                .addField(`Incident Date/Time`, `${incidentDate}`)
                .setColor("#f5d870")
            channel.send({ embeds: [botDownTime] })
        } else if (newPresence.status === 'idle') {
            const botUpgrade = new MessageEmbed()
                .setThumbnail('https://i.imgur.com/OjGZA28.png')
                .setTitle(`Application: BOT_NAME`)
                .setDescription(`BOT_NAME has gone down for maintenance!`)
                .addField(`Incident Date/Time`, `${incidentDate}`)
                .setColor("#f5d870")
            channel.send({ embeds: [botUpgrade] })
        }
    }
}
