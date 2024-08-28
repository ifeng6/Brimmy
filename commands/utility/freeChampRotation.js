import pkg from 'discord.js';
import config from '../../config.json' assert { type: 'json' }
import { champNameFromID } from '../../helpers/champNameFromID.js'
const { SlashCommandBuilder } = pkg;

const getChamps = async (interaction) => {
    try {
        const freeChamps = await fetch(`https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${config.riotAPIKey}`)
        const freeChampsJSON = await freeChamps.json()
        const { freeChampionIds } = freeChampsJSON
        const res = []
        freeChampionIds.forEach((champID) => {
            res.push(champNameFromID(champID.toString()))
        })
        interaction.reply(res.join('\n'))
    } catch (error) {
        interaction.reply(`${error}`)
    }
}

export const freeChampRotation = {
    data: new SlashCommandBuilder()
        .setName('free-champ-rotation')
        .setDescription('Replies with all the currently free to play champions for the week'),
    execute: getChamps
}