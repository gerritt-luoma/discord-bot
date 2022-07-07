const { SlashCommandBuilder } = require("@discordjs/builders");
const { ChannelType } = require("discord-api-types/v10");


const data = new SlashCommandBuilder()
  .setName('createcategory')
  .setDescription('Creates a new category for channels')
  .addStringOption(option =>
    option.setName('name')
      .setDescription('Name of new category')
      .setRequired(true));

module.exports = {
  data: data,
  async execute(interaction) {
    const name = interaction.options.getString('name');
    try {
      await interaction.guild.channels.create(name, {
        type: ChannelType.GuildCategory
      });
      await interaction.reply(`The category ${name} was created!`);
    } catch(err) {
      console.log(err);
    }
  }
}