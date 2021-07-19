
import { Info, Request, parseRequest } from "../interfaces/services/types"
import { validate_content } from "./utils"


export async function get<Result>(info: Request): Promise<Result | Error> {

    if (!validate_content(info.type)) {
        return new Error("Unmatched MIME/Content-Type");
    }

    let apiUrl = parseRequest(info);

    let response = await fetch(apiUrl, {
        method: Info.Method.Get,
        headers: {
            'Content-Type': info.type,
        }
    });
    
    return response.json();
}
