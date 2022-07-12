const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require('node-fetch')


const data = new SlashCommandBuilder()
  .setName('kanye')
  .setDescription('Gives you a random Kanye West quote')

module.exports = {
  data: data,
  async execute(interaction) {
    try {
      const res = await fetch('https://api.kanye.rest');
      const jsonRes = await res.json();
      if(!jsonRes.quote) {
        return;
      }
      await interaction.reply(`\"${jsonRes.quote}\" - Kanye West`);
    } catch(err) {
      console.error(err);
    }

  }
}