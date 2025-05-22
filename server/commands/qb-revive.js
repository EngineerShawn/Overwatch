/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "revive",
    description: "Raise a downed player to full health and stats",
    role: "admin",

    options: [
        {
            name: "id",
            description: "Player's current id",
            required: true,
            type: "INTEGER",
        },
    ],

    run: async (client, interaction, args) => {
        if (!GetPlayerName(args.id)) return interaction.reply({ content: "This ID seems invalid.", ephemeral: true });
        emitNet("hospital:client:Revive", args.id);
        client.utils.log.info(`[${interaction.member.displayName}] revived ${GetPlayerName(args.id)} (${args.id})`);
        return interaction.reply({ content: `${GetPlayerName(args.id)} (${args.id}) has been fully healed.`, ephemeral: false });
    },
};
