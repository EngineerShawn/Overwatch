/**
 * This file is part of Overwatch.
 * Copyright (C) 2023 Shawn/EngineerShawn
 * source: <https://github.com/EngineerShawn/Overwatch>
 *

 *
 *
 * This addon sends a message with status updates every x number of minutes in a specified channel
 * copy this into your `server/addons` folder and edit the channelId to the channel id you want messages sent.
 */

const { MessageEmbed } = require("discord.js");


class TimedMessage {
    constructor(z) {
        // Minutes
        this.timerDelay = 60;
        // Channel id to send server status updates
        this.channelId = "1070319167070273546";

        this.z = z;
        on("Overwatch:ready", async () => {
            this.post();
            this.start();
        });
    }

    async start() {
        setInterval(() => {
            this.post();
        }, 1000 * 60 * this.timerDelay);
    }

    async post() {
        try {
            const guild = this.z.bot.guilds.cache.get(this.z.config.DiscordGuildId);
            const channel = guild.channels.cache.get(this.channelId);
            const embed = new MessageEmbed();
            embed.setTitle("Server Status")
                .setColor("#f2449e")
                .setDescription(`**Uptime:** ${(GetGameTimer() / 1000 / 60).toFixed(2)} minutes
                **Server IP:** ${this.z.config.FiveMServerIP}
                **Online Players:** ${GetNumPlayerIndices()}/${GetConvar("sv_maxClients", "42")}
                **Discord Invite:** ${this.z.config.DiscordInviteLink}`);
            channel.send({ embeds: [ embed ] }).catch();
        } catch {
            // Just incase something unforseen happens
        }
    }

}

module.exports = TimedMessage;
