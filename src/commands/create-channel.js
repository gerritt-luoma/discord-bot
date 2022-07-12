const { SlashCommandBuilder } = require("@discordjs/builders");
const { ChannelType } = require("discord-api-types/v10");


const data = new SlashCommandBuilder()
  .setName('createchannel')
  .setDescription('An example of creating a channel with a bot')
  .addStringOption(option =>
    option.setName('name')
      .setDescription('name of newly created channel')
      .setRequired(true))
  .addNumberOption(option =>
    option.setName('type')
      .setDescription('The type of channel')
      .setRequired(true)
      .addChoices(
        { name: 'Text', value: ChannelType.GuildText },
        { name: 'Voice', value: ChannelType.GuildVoice }
      ))
  .addChannelOption(option =>
    option.setName('category')
      .setDescription('Which category you would like to add this channel to')
      .addChannelTypes(ChannelType.GuildCategory)
      .setRequired(false));

//TODO: Create categories (new function?) 
//be able to add channels to specified categories

module.exports = {
  data: data,
  async execute(interaction) {
    const { guild } = interaction;
    const name = interaction.options.getString('name');
    const type = interaction.options.getNumber('type');
    try {
      await guild.channels.create(name,{
        type: type
      });

      await interaction.reply(`The channel ${name} was created with type ${type}`);
    } catch(err) {
      console.log(err);
    }
  }
}