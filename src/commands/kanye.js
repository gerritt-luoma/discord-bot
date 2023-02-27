const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kanye')
        .setDescription('Will display a random kanye west quote'),
    async execute(interaction) {
        await interaction.deferReply();
        const res = await fetch('https://api.kanye.rest');
        const resJSON = await res.json();
        await interaction.editReply(`${resJSON.quote} - Kanye West`);
    },
};
