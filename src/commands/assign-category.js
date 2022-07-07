const { SlashCommandBuilder } = require("@discordjs/builders");
const { ChannelType } = require("discord-api-types/v10");


const data = new SlashCommandBuilder()
  .setName('assigntocategory')
  .setDescription('An example of assigning a channel to a category')
  .addChannelOption(option =>
    option.setName('category')
      .setDescription('The category to add the channel to')
      .addChannelTypes(ChannelType.GuildCategory)
      .setRequired(true));

module.exports = {
  data: data,
  async execute(interaction) {
    const parent = interaction.options.getChannel('category');
    const { channel } = interaction;
    try {
      await channel.setParent(parent);
      await interaction.reply(`The channel ${channel.name} was assigned to the ${parent.name} category`);
    } catch(err) {
      console.log(err);
    }
  }
}
