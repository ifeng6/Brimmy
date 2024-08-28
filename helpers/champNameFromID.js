import champData from '../champData.json' assert { type: 'json' }

// Returns champion name (string) given a champion ID (string)
export const champNameFromID = (champID) => {
    // Make sure input is a string
    if (typeof champID !== 'string') {
        throw new Error('Champion ID must be a string!')
    }

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