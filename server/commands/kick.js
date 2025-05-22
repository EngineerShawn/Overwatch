/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "kick",
    description: "Kick a player from the city",
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
            description: "Kick message to show the user",
            required: false,
            type: "STRING",
        },
    ],

    run: async (client, interaction, args) => {
        if (!GetPlayerName(args.id)) return interaction.reply({ content: "This ID seems invalid.", ephemeral: true });
        const reason = client.utils.replaceGlobals(client, args.message || client.z.locale.kickedWithoutReason);
        DropPlayer(args.id, reason);
        client.utils.log.info(`[${interaction.member.displayName}] Kicked ${GetPlayerName(args.id)} (${args.id}). Reason: ${reason}`);
        return interaction.reply({ content: `${GetPlayerName(args.id)} (${args.id}) has been kicked.`, ephemeral: false });
    },
};
