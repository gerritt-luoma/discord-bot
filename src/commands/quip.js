const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
  .setName('quip')
  .setDescription('A function used to save and retrieve funny quotes')
  .addUserOption(option =>
    option.setName('user')
      .setDescription('The user that said the quote')
      .setRequired(true))

module.exports = {
  data: data,
  async execute(interaction) {
    console.log(interaction.options.getUser('user'))
  }
}

// User {
//   id: string,
//   bot: bool,
//   system: bool,
//   flags: UserFlags { bitfield: 0 },
//   username: string,
//   discriminator: string,
//   avatar: string,
//   banner: undefined,
//   accentColor: undefined
// }