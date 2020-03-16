export default (str: string) => {
    const split = str.match(/.{1,2}/g);
    return split ? split.join(" ") : str;
}
