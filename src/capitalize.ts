/**
 * Capitalize a string
 */
export default (str?: string) => {
    if (!str) {
        return "";
    }
    return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase();
}
