/**
 * Pad a number with leading zeros
 */
export default (n: number, width: number): string => {
    const x = n.toString();
    return x.length >= width ? x : new Array(width - x.length + 1).join("0") + x;
}
