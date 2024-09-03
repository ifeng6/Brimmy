import pkg from 'discord.js';
import { spawn } from "child_process"
import { isChamp } from '../../helpers/isChamp.js';
const { SlashCommandBuilder } = pkg;

const getChampAdjustments = async (interaction) => {
    const query = interaction.options.getString('champ')
    const pythonProcess = spawn('python',["commands/utility/fetch-aram-changes.py", query]) // Run python file relative to home directory
    // Run web scraper
    pythonProcess.stdout.on('data', (output) => {
        const data = JSON.parse(output.toString())
        const res = []
        data.forEach(element => {
            const curr = []
            Object.keys(element).forEach(key => {
                curr.push(`${key}: ${element[key]}`)
            })
            res.push(curr.join(' | '))
        })
        if (res.length > 0) {
            interaction.reply(res.join('\n'))
        } else if (isChamp(query)) {
            const queryFormatted = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()
            interaction.reply(`${queryFormatted} has no balance changes in ARAM`)
        } else {
            interaction.reply('Sorry, invalid champion : [')
        }
    })
}


export const aramChampAdjustments = {
    data: new SlashCommandBuilder()
        .setName('aram-champ')
        .setDescription('Get ARAM-specific changes for a given champ')
        .addStringOption(option =>
            option
                .setName('champ')
                .setDescription('Champion you would like to know ARAM-specific changes')
                .setRequired(true)
        ),
    execute: getChampAdjustments,
}