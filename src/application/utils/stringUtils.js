export function textEllipsis(str, targetLength, {side = "end", ellipsis = "..."} = {}) {
    if (str.length > targetLength) {
        let charsToShow = targetLength - ellipsis.length;

        switch (side) {
            case "start":
                return ellipsis + str.slice(-charsToShow);
            case "end":
                return str.slice(0, charsToShow) + ellipsis;
            case "middle":
                const frontChars = Math.ceil(charsToShow / 2);
                const backChars = Math.floor(charsToShow / 2);

                return str.substr(0, frontChars) + ellipsis + str.substr(str.length - backChars);
            default:
                return str;
        }
    }
    return str;
}