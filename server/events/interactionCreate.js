/**
 * This file is part of overwatch.
 * Copyright (C) 2023 Shawn/overwatch
 * source: <https://github.com/bountyfiveo/overwatch>
 *

 */
// 📄 /server/events/interactionCreate.js

const { Events, PermissionsBitField, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Overwatch modals & buttons imports
const { serverNameModal } = require('../components/modals/serverModal');
const { setupButtonRow } = require('../components/buttons/setupButton');

const GUILDS_DATA_PATH = path.join(__dirname, '../data/guilds.json');

function saveGuildData(guildId, serverName) {
  let guilds = {};
  try {
    guilds = JSON.parse(fs.readFileSync(GUILDS_DATA_PATH, 'utf-8'));
  } catch (e) {
    console.warn('[Overwatch] guilds.json read failed, initializing new.');
  }

  guilds[guildId] = { serverName, updatedAt: new Date().toISOString() };

  fs.writeFileSync(GUILDS_DATA_PATH, JSON.stringify(guilds, null, 2), 'utf-8');
}

async function createSetupStructure(interaction) {
  const guild = interaction.guild;

  // 1. Create role: whitelisted (if not exists)
  let whitelistedRole = guild.roles.cache.find(r => r.name === 'whitelisted');
  if (!whitelistedRole) {
    whitelistedRole = await guild.roles.create({
      name: 'whitelisted',
      color: 'Blue',
      reason: 'Overwatch Setup: whitelisted role',
    });
  }

  // 2. Create categories if not exists
  const categoriesNeeded = ['📋 Applications', '🛠️ Support', '✅ Whitelisted'];
  const existingCategories = guild.channels.cache.filter(c => c.type === ChannelType.GuildCategory);

  const categories = {};

  for (const categoryName of categoriesNeeded) {
    let cat = existingCategories.find(c => c.name === categoryName);
    if (!cat) {
      cat = await guild.channels.create({
        name: categoryName,
        type: ChannelType.GuildCategory,
        reason: 'Overwatch Setup: Create category',
      });
    }
    categories[categoryName] = cat;
  }

  // 3. Create channels under categories + set permissions

  // Permissions templates
  const everyonePerms = [
    { id: guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
    { id: whitelistedRole.id, deny: [PermissionsBitField.Flags.ViewChannel] },
  ];

  // Applications: visible to everyone (allow view)
  // Support, Whitelisted: visible only to whitelisted & admin

  // Applications Category -> allow everyone to view
  await categories['📋 Applications'].permissionOverwrites.set([
    {
      id: guild.roles.everyone.id,
      allow: [PermissionsBitField.Flags.ViewChannel],
    },
  ]);

  // Support & Whitelisted Categories -> deny everyone except whitelisted + admin
  for (const catName of ['🛠️ Support', '✅ Whitelisted']) {
    await categories[catName].permissionOverwrites.set([
      {
        id: guild.roles.everyone.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
      {
        id: whitelistedRole.id,
        allow: [PermissionsBitField.Flags.ViewChannel],
      },
      // Note: Admin permissions inherited from roles with ManageChannels
    ]);
  }

  // Create channel: 📄 whitelist-application under Applications category
  let appChannel = guild.channels.cache.find(
    (ch) => ch.name === 'whitelist-application' && ch.parentId === categories['📋 Applications'].id
  );

  if (!appChannel) {
    appChannel = await guild.channels.create({
      name: 'whitelist-application',
      type: ChannelType.GuildText,
      parent: categories['📋 Applications'].id,
      reason: 'Overwatch Setup: Create whitelist application channel',
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
        },
      ],
    });
  }

  // 4. Send modal to collect FiveM server name
  await interaction.showModal(serverNameModal());

  return appChannel;
}

function welcomeEmbed(serverName) {
  return new EmbedBuilder()
    .setColor('#57F287')
    .setTitle('Welcome to Overwatch!')
    .setDescription(
      `Your server is now configured with Overwatch essentials.\n\n` +
      `Server Name: **${serverName}**\n\n` +
      `Click the button below to proceed to the Whitelist Dashboard.`
    )
    .setFooter({ text: 'Overwatch • Developed by EngineerShawn - Nova Studio' });
}

function getWhitelistedButton() {
  const button = new ButtonBuilder()
    .setLabel('Get Whitelisted')
    .setStyle(ButtonStyle.Link)
    .setURL('https://your-whitelist-dashboard.example.com'); // Change this URL to your actual whitelist dashboard

  return new ActionRowBuilder().addComponents(button);
}

module.exports = {
  name: 'interactionCreate',
  // interaction = https://discord.js.org/#/docs/main/stable/class/Interaction
  run: async (client, interaction) => {

    // --- BEGIN your existing command + context menu handler logic ---

    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({ content: "An error has occurred", ephemeral: true }).catch((error) => client.utils.log.handler("error", error));
      }
      if (!client.hasPermission(interaction.member, command.role)) {
        return interaction.reply({ content: "You don't have permission to use this command", ephemeral: true }).catch();
      }

      const args = {};
      for (const option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
          if (option.name) args[option.name] = true;
          option.options?.forEach((x) => {
            args[x.name] = x.value;
          });
        } else if (option.value) {
          args[option.name] = option.value;
        }
      }
      interaction.member = interaction.guild.members.cache.get(interaction.user.id);
      try {
        await command.run(client, interaction, args);
      } catch (error) {
        client.utils.log.error(error);
        interaction.reply({ content: "There was an error while executing this command!", ephemeral: true }).catch((err) => client.utils.log.handler("error", err));
      }
      return; // Important to exit here so that buttons/modal handling below is skipped on commands
    }

    if (interaction.isContextMenu()) {
      const command = client.commands.get(interaction.commandName);
      if (command) await command.run(client, interaction);
      return; // Skip the rest if context menu handled
    }

    // --- BEGIN Overwatch setup buttons and modal handler ---

    if (!interaction.isButton() && !interaction.isModalSubmit()) return;

    const { guild } = interaction;
    if (!guild) return;

    if (interaction.isButton() && interaction.customId === 'overwatch_init_setup') {
      await interaction.deferReply({ ephemeral: true });

      try {
        await createSetupStructure(interaction);
        await interaction.editReply({
          content: 'Setup categories, roles, and channels have been created. Please enter your FiveM server name.',
          ephemeral: true,
          components: [],
        });
      } catch (err) {
        console.error('[Overwatch] Setup initialization failed:', err);
        await interaction.editReply({
          content: 'Failed to initialize setup. Please check my permissions and try again.',
          ephemeral: true,
        });
      }
      return;
    }

    if (interaction.isModalSubmit() && interaction.customId === 'overwatch_server_name_modal') {
      const serverName = interaction.fields.getTextInputValue('fivem_server_name');
      if (!serverName || serverName.length > 50) {
        await interaction.reply({
          content: 'Invalid server name provided. Please try again.',
          ephemeral: true,
        });
        return;
      }

      try {
        // Save server name to JSON
        saveGuildData(guild.id, serverName);

        // Respond with Welcome Embed + Button
        await interaction.reply({
          embeds: [welcomeEmbed(serverName)],
          components: [getWhitelistedButton()],
          ephemeral: false,
        });
      } catch (err) {
        console.error('[Overwatch] Error saving server name:', err);
        await interaction.reply({
          content: 'Failed to save server name. Please try again later.',
          ephemeral: true,
        });
      }
      return;
    }
  },
};
