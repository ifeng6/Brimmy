import pkg from 'discord.js';
const { SlashCommandBuilder } = pkg;

export const ping = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    execute: async (interaction) => {
        await interaction.reply('Pong!')
    },
}