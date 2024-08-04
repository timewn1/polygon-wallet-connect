export const formatAddress = (address: string) => {
    return address.substring(0, 15) + '.....' + address.substring(address.length - 10);
}