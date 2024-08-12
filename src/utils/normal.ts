export const formatAddress = (address: string) => {
    return address.substring(0, 15) + '.....' + address.substring(address.length - 10);
}

export const getNowDate = () => {
    const now = new Date();

    // Get the components of the date
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const day = ('0' + now.getDate()).slice(-2);

    return `${year}-${month}-${day}`
}