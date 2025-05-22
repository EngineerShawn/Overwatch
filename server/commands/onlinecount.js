/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "onlinecount",
    description: "Number of players currently online",

    run: async (client, interaction) => {
        const playerNumber = GetNumPlayerIndices();
        let message = "Nobody is online right now.";
        if (playerNumber === 1) message = "There is 1 person online right now.";
        else if (playerNumber > 1) message = `There are ${playerNumber} people online right now.`;
        return interaction.reply({ content: message, ephemeral: false });
    },
};
