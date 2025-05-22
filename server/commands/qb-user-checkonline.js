/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "onlinecheck",
    type: "USER",
    role: "mod",

    run: async (client, interaction, args) => {
        const player = await client.utils.getPlayerFromDiscordId(interaction.targetId);
        if (!player) return interaction.reply({ content: `<@${interaction.targetId}> is offline right now.`, ephemeral: true });
        const qbplayer = client.QBCore.Functions.GetPlayer(parseInt(player));
        if (!qbplayer) return interaction.reply({ content: `<@${interaction.targetId}> is online but not loaded in.`, ephemeral: true });
        return interaction.reply({ content: `<@${interaction.targetId}> is online! Playing as ${qbplayer.PlayerData.charinfo.firstname} ${qbplayer.PlayerData.charinfo.lastname} (${qbplayer.PlayerData.citizenid})`, ephemeral: true });
    },
};
