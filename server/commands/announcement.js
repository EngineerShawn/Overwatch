/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/EngineerShawn
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "announcement",
    description: "Send in city announcement",
    role: "mod",

    options: [
        {
            name: "message",
            description: "announcement to send",
            required: true,
            type: "STRING",
        },
    ],

    run: async (client, interaction, args) => {
        client.utils.chatMessage(-1, client.z.locale.announcement, args.message, { color: [ 255, 0, 0 ] });
        client.utils.log.info(`[${interaction.member.displayName}] Announcement: ${args.message}`);
        interaction.reply({ content: "Announcement Sent", ephemeral: false });
    },
};
