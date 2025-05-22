/**
 * This file is part of Overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "ready",
    once: true,
    run: async (client) => {
        if (client.config.EnableDiscordSlashCommands) {
            const guild = client.guilds.cache.get(client.config.DiscordGuildId);
            if (!guild) return client.utils.log.error("DISCORD SERVER NOT FOUND - Is your config for 'DiscordGuildId' set correctly?");
            await guild.commands.set(client.arrayOfCommands).catch((error) => client.utils.log.handler("error", error));
        }
        if (client.config.EnableBotStatusMessages && client.config.BotStatusMessages) statusUpdater(client);
        client.utils.log.info(`Logged in as ${client.user.tag}`);
        client.utils.log.info("Enjoying Overwatch? Consider supporting it at patreon.com/overwatch or paypal.me/overwatch <3");
        emit("Overwatch:ready");
    },
};

async function statusUpdater(client) {
    setInterval(function() {
        try {
            const msg = client.utils.replaceGlobals(client, client.config.BotStatusMessages[Math.floor(Math.random() * client.config.BotStatusMessages.length)]);
            client.user.setActivity({ name: msg, type: "PLAYING" });
        } catch (e) {
            // Just gonna void these errors..
        }
    }, 20000);
}
