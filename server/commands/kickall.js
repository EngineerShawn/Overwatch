/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "kickall",
    description: "Kick every player in the city",
    role: "admin",

    options: [
        {
            name: "message",
            description: "Kick message to show the user",
            required: true,
            type: "STRING",
        },
    ],

    run: async (client, interaction, args) => {
        const numberOnline = GetNumPlayerIndices();
        if (numberOnline === 0) return interaction.reply({ content: "Nobody was online to kick.", ephemeral: false });
        getPlayers().forEach(async (player) => {
            DropPlayer(player, args.message);
        });
        client.utils.log.info(`[${interaction.member.displayName}] Kicked all ${numberOnline} player(s). Reason: ${args.message}`);
        return interaction.reply({ content: `All ${numberOnline} player(s) have been kicked.`, ephemeral: false });
    },
};
