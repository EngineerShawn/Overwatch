// 📄 /server/events/guildCreate.js
const { Events, ChannelType, PermissionsBitField } = require('discord.js');
const { setupEmbed } = require('../components/embeds/setupEmbed');
const { setupButtonRow } = require('../components/buttons/setupButton');

module.exports = {
  name: Events.GuildCreate,
  once: false,

  async execute(guild) {
    const channels = guild.channels.cache.filter(
      (channel) =>
        channel.type === ChannelType.GuildText &&
        channel
          .permissionsFor(guild.members.me)
          .has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel])
    );

    const defaultChannel =
      channels.find((ch) => ch.name.includes('welcome')) ||
      channels.find((ch) => ch.name.includes('just-landed')) ||
      guild.systemChannel ||
      channels.first();

    if (!defaultChannel) return;

    try {
      await defaultChannel.send({
        embeds: [setupEmbed(guild.name)],
        components: [setupButtonRow()],
      });
    } catch (err) {
      console.error(`[Overwatch] Failed to send Setup Wizard to ${guild.name}:`, err);
    }
  },
};
