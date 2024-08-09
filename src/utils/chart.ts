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

export const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);

    // Get the components of the date
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const day = ('0' + date.getDate()).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    // Return the formatted date string as "mm/dd/yyyy hh:mm:ss"
    return `${month}/${day} ${hours}:${minutes}:${seconds}`;
}