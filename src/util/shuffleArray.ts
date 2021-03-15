export const shuffleArray = (data:Array<Object>) => {
    for (let index = data.length -1 ; index > 0; index--) {
        const j = Math.floor(Math.random()*(index+1))
        const temp = data[index]
        data[index] = data[j]
        data[j] = temp;        
    }
    return data
}