/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "message",
    description: "direct a message to a specific player",
    role: "mod",

    options: [
        {
            name: "id",
            description: "Player's current id",
            required: true,
            type: "INTEGER",
        },
        {
            name: "message",
            description: "Message for player",
            required: true,
            type: "STRING",
        },
    ],

    run: async (client, interaction, args) => {
        if (!GetPlayerName(args.id)) return interaction.reply({ content: "This ID seems invalid.", ephemeral: true });
        client.utils.chatMessage(args.id, client.z.locale.directMessage, args.message);
        client.utils.log.info(`[${interaction.member.displayName}] sent a DM to ${GetPlayerName(args.id)} (${args.id}): ${args.message}`);
        return interaction.reply({ content: `Message sent to ${GetPlayerName(args.id)} (${args.id}).`, ephemeral: false });
    },
};
