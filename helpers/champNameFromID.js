import champData from '../champData.json' assert { type: 'json' }

// Returns champion name (string) given a champion ID (string)
export const champNameFromID = (champID) => {
    const { data } = champData
    let champName;
    Object.keys(data).forEach(key => {
        if (data[key]['key'] === champID) {
            champName = key
        }
    })

    if (champName) {
        return champName
    } else {
        throw new Error('Champion ID not found!')
    }
}