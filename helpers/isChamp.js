import champData from '../champData.json' assert { type: 'json' }

// Returns true if name is a champion, false otherwise
export const isChamp = (name) => {
    // Make sure input is a string
    if (typeof name !== 'string') {
        throw new Error('Champion name must be a string!')
    }

    const { data } = champData
    let res = false
    Object.keys(data).forEach(key => {
        if (key.toLowerCase() === name.toLowerCase()) {
            res = true
        }
    })

    return res
}