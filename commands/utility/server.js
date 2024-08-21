import pkg from 'discord.js';
const { SlashCommandBuilder } = pkg;

export const server = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server information!'),
    execute: async (interaction) => {
        await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
    }
}
