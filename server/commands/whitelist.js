/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/EngineerShawn/overwatch>
 *

 */

module.exports = {
    name: "whitelist",
    description: "Manage whitelist",
    role: "god",

    options: [
        {
            type: "SUB_COMMAND",
            name: "toggle",
            description: "Enable / Disable whitelisting",
            options: [
                {
                    name: "enabled",
                    description: "Choose to enable or disable whitelist",
                    required: true,
                    type: "BOOLEAN",
                },
            ],
        },
        {
            type: "SUB_COMMAND",
            name: "addrole",
            description: "Temp add role to whitelist (restart reverts to config)",
            options: [
                {
                    name: "role",
                    description: "role to whitelist",
                    required: true,
                    type: "ROLE",
                },
            ],
        },
        {
            type: "SUB_COMMAND",
            name: "removerole",
            description: "Temp remove role from whitelist (restart reverts to config)",
            options: [
                {
                    name: "role",
                    description: "role to remove from whitelist",
                    required: true,
                    type: "ROLE",
                },
            ],
        },
    ],

    run: async (client, interaction, args) => {
        if (args.toggle) {
            const prev = client.config.EnableWhitelistChecking;
            client.config.EnableWhitelistChecking = args.enabled;
            return interaction.reply({ content: `Whitelist was previously ${prev ? "enabled" : "disabled"} and is now ${args.enabled ? "enabled" : "disabled"}`, ephemeral: true });
        } else if (args.addrole) {
            if (client.config.DiscordWhitelistRoleIds.includes(args.role)) {
                return interaction.reply({ content: "That role is already whitelisted", ephemeral: true });
            }
            client.config.DiscordWhitelistRoleIds.push(args.role);
            return interaction.reply({ content: "Role has been whitelisted till restart", ephemeral: true });
        } else if (args.removerole) {
            if (!client.config.DiscordWhitelistRoleIds.includes(args.role)) {
                return interaction.reply({ content: "That role was not in the whitelist", ephemeral: true });
            }
            client.config.DiscordWhitelistRoleIds = client.config.DiscordWhitelistRoleIds.filter(item => item !== args.role);
            return interaction.reply({ content: "Role has been removed from whitelist", ephemeral: true });
        }

    },
};
