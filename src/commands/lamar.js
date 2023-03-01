const { SlashCommandBuilder } = require('discord.js');
const { getResponse } = require('../utils/openai');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lamar')
        .setDescription('Will respond to your message in the form of Lamar Davis from GTA: V.')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('The prompt to be sent to Jeff')
                .setRequired(true)),
    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');
        const response = await getResponse(prompt, 'lamar');
        await interaction.reply(response);
    },
};