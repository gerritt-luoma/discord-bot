const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
  .setName('mention')
  .setDescription('How to get the ID of a user and respond with a mention of them')
  .addUserOption(option =>
    option.setName('user')
      .setDescription('User you would like to have mentioned')
      .setRequired(true));



module.exports = {
  data: data,
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const id = user.id;
    await interaction.reply(`<@${id}>`);
  }
}