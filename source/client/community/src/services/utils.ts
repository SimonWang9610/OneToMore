import { Info, Request, Result } from "../interfaces/services/types"

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