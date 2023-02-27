const { Events, Client, GatewayIntentBits, Collection } = require('discord.js');
const { config } = require('dotenv');
const path = require('node:path');
const fs = require('node:fs');
config();

// Initialize client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Add all commands to the commands collection
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.warn(`[WARNING] The command at ${filePath} is missing required "data" or "execute" property`);
    }
});

// Log that I successfully logged in
client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
});

// Handle interactions.  Currently only handling chat command interactions.  Will add support for other interactions later.
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching the name ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command', ephemeral: true });
        }
        else {
            await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
        }
    }
});

// Login
client.login(process.env.PRODUCTION ? process.env.JEFFS_TOKEN || '' : process.env.TESTING_TOKEN || '');
