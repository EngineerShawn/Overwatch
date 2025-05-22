/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "revive-all",
    description: "Raise all downed players to full health and stats",
    role: "god",

    run: async (client, interaction, args) => {
        emitNet("hospital:client:Revive", -1);
        client.utils.log.info(`[${interaction.member.displayName}] revived EVERYONE`);
        return interaction.reply({ content: "Everyone has been fully healed.", ephemeral: false });
    },
};
