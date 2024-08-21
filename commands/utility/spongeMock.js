import pkg from 'discord.js';
const { SlashCommandBuilder } = pkg;

const mockText = (string) => {
    const stringUPC = string.toUpperCase();
    let alternator = 0;
    let result = "";
    let stringToAdd;
    for (let i = 0; i < string.length; i++) {
        alternator % 2 == 0 ? stringToAdd = string[i] : stringToAdd = stringUPC[i];
        result += stringToAdd;
        if (stringToAdd !== " ") {
            alternator++;
        }
    }
    return result;
}

export const spongeMock = {
    data: new SlashCommandBuilder()
        .setName('spongemock')
        .setDescription('Replies text with alternating case')
        .addStringOption(option => 
            option
                .setName('text')
                .setDescription('Input the text to be converted')
                .setRequired(true)),
    execute: async (interaction) => {
        await interaction.reply(mockText(interaction.options.getString('text')));
    }
}
