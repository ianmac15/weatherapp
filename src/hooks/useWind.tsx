

export const getWindDir = (windDir?: string) => {
    if (typeof windDir === 'string') {
        try {
            let newString = ""
            for (let i = 0; i < windDir.length; i++) {
                if (windDir[i] == 'N') newString += "North "
                if (windDir[i] == 'E') newString += "East "
                if (windDir[i] == 'S') newString += "South "
                if (windDir[i] == 'W') newString += "West "
            }
            return newString
        } catch {
            console.log('Invalid Wind Direction')

        }
    }

    return ''
}

