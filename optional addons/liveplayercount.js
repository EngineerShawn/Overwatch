/**
 * This file is part of Overwatch.
 * Copyright (C) 2023 Shawn/EngineerShawn
 * source: <https://github.com/EngineerShawn/Overwatch>
 *

 *
 * This addon enables you to have a voice channel that updates constantly with the current number of players online
 * copy this into your `server/addons` folder and edit the voiceChannelId to the channel id you want to use then start your server
 *
 * DO NOT TRY TO CHANGE THE UPDATE RATE ANY LOWER - doing so will cause your IP to get restricted from the discord api
 */

class LivePlayerCount {
    constructor(z) {
        // Id for the voice channel name to update
        this.voiceChannelId = "1085515901685747732";

        this.z = z;
        on("overwatch:ready", async () => {
            this.syncChannel();
            this.start();
        });
    }

    async start() {
        setInterval(() => {
            this.syncChannel();
        }, 1000 * 60 * 5);
    }

    async syncChannel() {
        try {
            const guild = this.z.bot.guilds.resolve(this.z.config.DiscordGuildId);
            const channel = guild.channels.cache.get(this.voiceChannelId);
            channel.setName(`Players Online: ${GetNumPlayerIndices()}`).catch();
        } catch {
            // Just incase something unforseen happens
        }
    }

}

module.exports = LivePlayerCount;
