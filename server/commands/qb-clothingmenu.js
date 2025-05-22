/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "clothing-menu",
    description: "Give a player the clothing menu",
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
        emitNet("qb-clothing:client:openMenu", args.id);
        client.utils.log.info(`[${interaction.member.displayName}] gave ${args.id} the clothing menu`);
        return interaction.reply({ content: `${GetPlayerName(args.id)} (${args.id}) was given the clothing menu`, ephemeral: false });
    },
};
