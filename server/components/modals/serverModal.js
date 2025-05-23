// 📄 /server/components/modals/serverModal.js
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

function serverNameModal() {
  const modal = new ModalBuilder()
    .setCustomId('overwatch_server_name_modal')
    .setTitle('FiveM Server Setup');

  const serverNameInput = new TextInputBuilder()
    .setCustomId('fivem_server_name')
    .setLabel('Enter your FiveM Server Name')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('e.g. My RP Server')
    .setRequired(true)
    .setMaxLength(50);

  const firstActionRow = new ActionRowBuilder().addComponents(serverNameInput);

  modal.addComponents(firstActionRow);

  return modal;
}

module.exports = { serverNameModal };
