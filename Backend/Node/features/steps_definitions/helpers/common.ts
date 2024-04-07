/** Adapted from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript */
export function randomString(length: number, characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
    let result = '';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export function randomUppercaseLetters(length: number) {
    return randomString(length, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
}

export function randomDigits(length: number) {
    return randomString(length, "0123456789");
}

/**
 * A shared storage between steps definitions
 */
export const context: {[key: string]: any} = {};
