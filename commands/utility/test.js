import pkg from 'discord.js';
const { SlashCommandBuilder } = pkg;

export const test = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Replies with interaction information!'),
    execute: async (interaction) => {
        await interaction.reply({ content: 'Check the console!', ephemeral: true });
        console.log(interaction);
    }
}