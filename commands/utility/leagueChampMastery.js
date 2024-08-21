import pkg from 'discord.js'
import config from '../../config.json' assert { type: 'json' }
import { riotRegionalRouting, riotPlatformRouting } from '../../constants.js'

const { SlashCommandBuilder } = pkg
const { riotAPIKey } = config

const getMasteries = async (interaction) => {
    const region = interaction.options.getString('region')
    const platform = interaction.options.getString('platform')
    const gameName = interaction.options.getString('gamename')
    const tagLine = interaction.options.getString('tagline')

    // Fetch PUUID 
    try {
        const puuidResponse = await fetch(`https://${region}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${riotAPIKey}`)
        const puuidResponseJSON = await puuidResponse.json()
        const { puuid } = puuidResponseJSON
        if (!puuid) {
            throw new Error('Player not found!')
        }
        console.log('made it here')
        // Get Champion Mastery information
        const masteryResponse = await fetch(`https://${platform}/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?api_key=${riotAPIKey}`)
        const responseJSON = await masteryResponse.json()
        if (!responseJSON) {
            throw new Error('Error loading masteries.')
        }

        // Return list of top champion masteries (API already returns in descending order)
        const res = []
        let i = 1
        responseJSON.forEach(element => {
            const { championId, championLevel, championPoints } = element
            res.push(`${i}. Champ: ${championId}, Champ Level: ${championLevel}, Champ Points: ${championPoints}`) // Need to map ChampIds to Champion Names
            i++
        })
        interaction.reply(`Here are your top masteries: ${res} `) // Temporarily return list --> will be embeds
    } catch (error) {
        interaction.reply(`${error}`)
    }
}

export const leagueChampMastery = {
    data: new SlashCommandBuilder()
        .setName('leaguemasteries')
        .setDescription('See your top champion masteries')
        .addStringOption(option =>
            option
                .setName('region')
                .setDescription('Region of the account')
                .setRequired(true)
                .addChoices(
                    { name: "Americas", value: riotRegionalRouting.AMERICAS },
                    { name: "Asia", value: riotRegionalRouting.ASIA },
                    { name: "Europe", value: riotRegionalRouting.EUROPE }
                ))
        .addStringOption(option =>
            option
                .setName('platform')
                .setDescription('Platform of the account')
                .setRequired(true)
                .addChoices(
                    { name: "BR1", value: riotPlatformRouting.BR1 },
                    { name: "EUN1", value: riotPlatformRouting.EUN1 },
                    { name: "EUW1", value: riotPlatformRouting.EUW1 },
                    { name: "JP1", value: riotPlatformRouting.JP1 },
                    { name: "KR", value: riotPlatformRouting.KR },
                    { name: "LA1", value: riotPlatformRouting.LA1 },
                    { name: "LA2", value: riotPlatformRouting.LA2 },
                    { name: "NA1", value: riotPlatformRouting.NA1 },
                    { name: "OC1", value: riotPlatformRouting.OC1 },
                    { name: "TR1", value: riotPlatformRouting.TR1 },
                    { name: "RU", value: riotPlatformRouting.RU },
                    { name: "PH2", value: riotPlatformRouting.PH2 },
                    { name: "SG2", value: riotPlatformRouting.SG2 },
                    { name: "TH2", value: riotPlatformRouting.TH2 },
                    { name: "TW2", value: riotPlatformRouting.TW2 },
                    { name: "VN2", value: riotPlatformRouting.VN2 },
                ))
        .addStringOption(option =>
            option
                .setName('gamename')
                .setDescription('In-game name')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('tagline')
                .setDescription('Riot tagline ex. NA1')
                .setRequired(true)),
    execute: getMasteries,
}