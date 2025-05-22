/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "logout",
    description: "send a player back to the character selection screen",
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

        client.QBCore.Player.Logout(args.id);
        emitNet("qb-multicharacter:client:chooseChar", args.id);

        client.utils.log.info(`[${interaction.member.displayName}] logged ${GetPlayerName(args.id)} (${args.id}) out`);
        return interaction.reply({ content: `${GetPlayerName(args.id)} (${args.id}) was sent to the character screen.`, ephemeral: false });
    },
};
