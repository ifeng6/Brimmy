import config from './config.json' assert { type: 'json' }
import fs from 'fs'

// Dynamically retrieve newest League of Legends champion data and store it in champData.json
(async () => {
    const version = await fetch(config.leagueVersionURL)
    const versionJSON = await version.json()
    const newestVersion = versionJSON[0]

    const champData = await fetch(`https://ddragon.leagueoflegends.com/cdn/${newestVersion}/data/en_US/champion.json`)
    const champDataJSON = await champData.json()
    
    const champDataString = JSON.stringify(champDataJSON, null, 2)
    fs.writeFileSync('champData.json', champDataString, (err) => {
        if (err) {
            console.error('Error writing file', err);
        } else {
            console.log('Successfully wrote file');
        }
    })
})();