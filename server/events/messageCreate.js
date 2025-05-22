/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "messageCreate",
    // msg = https://discord.js.org/#/docs/main/stable/class/Message
    run: async (client, msg) => {
        if (!msg.content || msg.author.bot) return;
        if (client.config.EnableStaffChatForwarding && msg.channel.id == client.config.DiscordStaffChannelId) {
            client.utils.sendStaffChatMessage(client.z, msg.member.displayName, msg.content);
            return client.z.utils.log.write(`${msg.member.displayName}: ${msg.content}`, { tag: "STAFFCHAT" });
        }
    },
};
