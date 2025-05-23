// 📄 /server/components/embeds/setupEmbed.js
const { EmbedBuilder } = require('discord.js');

function setupEmbed(guildName) {
  return new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle(`Welcome to Overwatch Setup Wizard`)
    .setDescription(
      `Hello! Thanks for adding Overwatch to your server: **${guildName}**.\n\n` +
      `Click the **Initialize Setup** button below to start configuring your server with ` +
      `required categories, roles, and channels.\n\n` +
      `This will create:\n` +
      `• Categories: 📋 Applications, 🛠️ Support, ✅ Whitelisted\n` +
      `• Role: whitelisted\n` +
      `• Essential channels and permissions\n\n` +
      `You can rerun this setup anytime by clicking the button again.`
    )
    .setFooter({ text: 'Overwatch • Developed by EngineerShawn - Nova Studio' });
}

module.exports = { setupEmbed };
