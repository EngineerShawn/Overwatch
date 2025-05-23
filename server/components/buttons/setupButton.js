// 📄 /server/components/buttons/setupButton.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function setupButtonRow() {
  const button = new ButtonBuilder()
    .setCustomId('overwatch_init_setup')
    .setLabel('Initialize Setup')
    .setStyle(ButtonStyle.Primary);

  return new ActionRowBuilder().addComponents(button);
}

module.exports = { setupButtonRow };
