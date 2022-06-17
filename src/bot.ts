import { Client, Collection, Intents } from "discord.js";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS
  ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

commandFiles.forEach(file => {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
})

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.login(process.env.DISCORD_TOKEN);
