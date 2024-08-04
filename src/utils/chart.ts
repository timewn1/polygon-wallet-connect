export const getNextTime = (lastTime: number, resolution: string) => {
    let _resolution = getResolutionValue(resolution);

    if (_resolution) {
        const nextTime = new Date(lastTime).getTime() + _resolution * 60 * 1000;

        return nextTime;
    }
}

export const getResolutionValue = (resolution: string) => {
    const match = resolution.match(/(\d+)(\D*)/);
    if (match) {
        let number = parseInt(match[1]);
        const string = match[2];

        if (string === "D") {
            number *= 60 * 24;
        } else if (string === "W") {
            number *= 60 * 24 * 7;
        } else if (string === 'M') {
            number *= 60 * 24 * 30;
        }
    
        return number;
    }
    return null;
}