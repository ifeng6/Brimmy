import pkg from 'discord.js';
const { SlashCommandBuilder } = pkg;

export const user = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user information!'),
    execute: async (interaction) => {
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined the server on ${interaction.member.joinedAt}.`);
    }
}