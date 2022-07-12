const { SlashCommandBuilder } = require("@discordjs/builders");
const { request } = require('undici');
const Canvas = require('@napi-rs/canvas');
const { MessageAttachment } = require("discord.js");
const { readFile } = require('fs/promises');

// This command is based off the discord js guide at https://discordjs.guide/popular-topics/canvas.html#setting-up-napi-rs-canvas

const data = new SlashCommandBuilder()
  .setName('image')
  .setDescription('An example of pulling a users profile picture');

module.exports = {
  data: data,
  async execute(interaction) {
    // set up context and canvas
    const canvas = Canvas.createCanvas(400, 600);
    const context = canvas.getContext('2d');

    // draw background image
    const backgroundFile = await readFile('src/images/pedestal.jpg');
    const background = new Canvas.Image();
    background.src = backgroundFile;
    context.drawImage(background, 0, 0, canvas.width, canvas.height);


    // prepare profile picture to be drawn as a circle
    context.beginPath();
    context.arc(200, 300, 100, 0, Math.PI * 2);
    context.closePath();
    context.clip();

    // get profile picture and draw
    const { body } = await request(interaction.user.displayAvatarURL({format: 'jpg'}));
    const avatar = new Canvas.Image();
    avatar.src = Buffer.from(await body.arrayBuffer());
    context.drawImage(avatar, 100, 200, 200, 200);


    // create attachment and send
    const attachment = new MessageAttachment(canvas.toBuffer('image/png'), 'profile-avatar.png');
    await interaction.reply({files: [attachment]});
  }
}