
import { Info, Request, parseRequest } from "../interfaces/services/index"
import { validate_content } from "./utils"


export async function get<Result>(info: Request, token: string | null): Promise<Result> {

    if (!validate_content(info.type)) {
        throw new Error("Unmatched MIME/Content-Type");
    }

    let apiUrl = parseRequest(info);


    let response = await fetch(apiUrl, {
        method: Info.Method.Get,
        headers: {
            'Content-Type': info.type,
            'Token': token? token: "",
        }
    });
    
    return response.json();
}
