const { SlashCommandBuilder } = require('discord.js');
const { setTimeout } = require('node:timers/promises');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dad')
        .setDescription('Will return a random dad joke'),
    async execute(interaction) {
        await interaction.deferReply();
        const url = 'https://dad-jokes.p.rapidapi.com/random/joke';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.DAD_JOKES_KEY,
                'X-RapidAPI-Host': process.env.DAD_JOKES_HOST,
            },
        };

        // errors are handled at the top level so I'm not handling them here
        const res = await fetch(url, options);
        const resJSON = await res.json();
        const { setup, punchline } = resJSON.body[0];
        await interaction.editReply(setup);
        await setTimeout(3000);
        await interaction.editReply({ content: `${setup}\n\n${punchline}` });
    },
};