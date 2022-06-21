const { SlashCommandBuilder } = require('@discordjs/builders');
const { getOrCreateUser } = require('../db/user')

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
    const user = interaction.options.getUser('user') 
    const createdUser = getOrCreateUser(user.id);
    console.log(createdUser);
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