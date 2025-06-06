/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

const { MessageButton } = require("discord.js");

module.exports = {
    name: "players",
    description: "Get list of current players in city",
    role: "mod",

    run: async (client, interaction) => {
        if (GetNumPlayerIndices() === 0) return interaction.reply({ content: "Nobody is currently online to pull", ephemeral: false });
        const parts = [];
        let index = 0;
        getPlayers().sort().forEach((id) => {
            const i = Math.floor(index / 10);
            if (!parts[i]) parts[i] = "";
            parts[i] += `\`[${id}]\` **${GetPlayerName(id)}**`;
            if (client.QBCore) {
                try {
                    const player = client.QBCore.Functions.GetPlayer(parseInt(id));
                    parts[i] += ` | (${player.PlayerData.citizenid}) **${player.PlayerData.charinfo.firstname} ${player.PlayerData.charinfo.lastname}**\n`;
                } catch { parts[i] += " (Not yet loaded)\n"; }
            } else { parts[i] += "\n"; }
            index++;
        });
        const pages = [];
        parts.forEach((part) => {
            const embed = new client.Embed()
                .setTitle(`Players (${GetNumPlayerIndices()})`)
                .setDescription(`${part}`);
            pages.push(embed);
        });
        const backBtn = new MessageButton().setCustomId("previousbtn").setEmoji("🔺").setStyle("SECONDARY");
        const forwardBtn = new MessageButton().setCustomId("nextbtn").setEmoji("🔻").setStyle("SECONDARY");
        client.paginationEmbed(interaction, pages, [backBtn, forwardBtn]);
    },
};
