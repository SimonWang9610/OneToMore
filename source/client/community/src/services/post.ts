
import { Info, Request, parseRequest} from "../interfaces/services/index"
import { validate_content, getTokenFromStore } from "./utils"


// declare namespace Post {
//     function data(info: PostInfo): Promise<boolean>;
// }

export async function post<Result>(postInfo: Request, data: string | FormData | null): Promise<Result> {

    if (!validate_content(postInfo.type)) {
        throw new Error("Unmatched MIME/Content-Type");
    }

    let apiUrl = parseRequest(postInfo);

    let token = getTokenFromStore();

    let response = await fetch(apiUrl, {
        method: Info.Method.Get,
        headers: {
            'Content-Type': postInfo.type,
            'Token': token? token: "",
        },
        body: data,
    });
    
    return response.json();
}

export async function remove<Result>(info: Request): Promise < Result> {

    if (!validate_content(info.type)) {
        throw new Error("Unmatched MIME/Content-Type");
    }

    let apiUrl = parseRequest(info);
    let token = getTokenFromStore();

    let response = await fetch(apiUrl, {
        method: Info.Method.Delete,
        headers: {
            'Content-Type': info.type,
            'Token': token? token: "",
        }
    });

    return response.json();

}