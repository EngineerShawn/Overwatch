/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "identifiers",
    description: "Get all of a player's identifiers",
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
        const embed = new client.Embed()
            .setColor(client.config.embedColor)
            .setTitle(`${GetPlayerName(args.id)}'s identifiers`)
            .setFooter({ text: "Please respect privacy and avoid doxing players" });
        let desc = "";
        for (const [key, value] of Object.entries(client.utils.getPlayerIdentifiers(args.id))) {
            if (key == "discord") desc += `**${key}:** <@${value}> (${value})\n`;
            else desc += `**${key}:** ${value}\n`;
        }
        embed.setDescription(desc);
        client.utils.log.info(`[${interaction.member.displayName}] pulled identifiers on ${GetPlayerName(args.id)} (${args.id})`);
        return interaction.reply({ embeds: [embed], ephemeral: true }).catch();
    },
};
