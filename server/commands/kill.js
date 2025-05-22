/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "kill",
    description: "kill a player in city",
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
        emitNet(`${GetCurrentResourceName()}:kill`, args.id);
        client.utils.log.info(`[${interaction.member.displayName}] Killed ${GetPlayerName(args.id)} (${args.id})`);
        return interaction.reply({ content: `${GetPlayerName(args.id)} (${args.id}) has been murdered.`, ephemeral: false });
    },
};
