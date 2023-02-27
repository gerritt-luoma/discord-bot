const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { config } = require('dotenv');

// Load environment vars
config();

// Grab all necessary tokens from env
const token = process.env.PRODUCTION ? process.env.JEFFS_TOKEN || '' : process.env.TESTING_TOKEN || '';
const clientId = process.env.PRODUCTION ? process.env.JEFFS_CLIENT_ID || '' : process.env.TESTING_CLIENT_ID || '';
const guildId = process.env.PRODUCTION ? process.env.PROD_GUILD_ID || '' : process.env.TESTING_GUILD_ID || '';

// Load all files into array as json
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
});

// Post all commands to guild
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`Refreshing ${commands.length} application (/) commands`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully refreshed ${data.length} application (/) commands`);
    }
    catch (error) {
        console.error(error);
    }
})();
