import pkg from 'discord.js';
const { SlashCommandBuilder } = pkg;

const generateRandomNumber = (firstNum, secondNum = 0) => {
    // calculate the random number
    let max = Math.max(secondNum, firstNum);
    let min = Math.min(secondNum, firstNum);

    let difference = max - min;
    difference++; // account for floor function doing weird things
    let randInt = Math.floor((Math.random() * difference)) + min;

    let result = randInt.toString();
    return result;
}

export const pickNumber = {
    data: new SlashCommandBuilder()
        .setName('picknumber')
        .setDescription('Picks a number given a range')
        .addNumberOption(option =>
            option
                .setName('firstnum')
                .setDescription('First number')
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('secondnum')
                .setDescription('Second number')),
    execute: async (interaction) => {
        const number = generateRandomNumber(interaction.options.getNumber('firstnum'), interaction.options.getNumber('secondnum'))
        await interaction.reply({ content: `${number}`, ephemeral: true })
    },
}