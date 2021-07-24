import { Info } from "../interfaces/services/index"

// ensure only post or get the specific content types listed in Info.ContentType
export function validate_content(type: string): boolean {
    let validated = false;

    for (let option in Info.ContentType) {
        if (type === option) {
            validated = true;
            break;
        }
    }
    return validated;
}

export function getTokenFromStore(): string | null {
    let token = window.localStorage.getItem("token");

    return token;
    // if (!token) {
    //     throw new Error("Token must be provided!");
    // } else {
    //     return token;
    // }
}

export function setToken(token: string): boolean {
    try {
        window.localStorage.setItem("token", token);
    } catch (exception) {
        return false;
    }
    return true;
}