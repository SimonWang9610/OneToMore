
import { Info, Request, parseRequest} from "../interfaces/services/types"
import { validate_content } from "./utils"


// declare namespace Post {
//     function data(info: PostInfo): Promise<boolean>;
// }

export async function post<Result>(postInfo: Request, data: string | FormData | null): Promise<Result | Error> {

    if (!validate_content(postInfo.type)) {
        return new Error("Unmatched MIME/Content-Type");
    }

    let apiUrl = parseRequest(postInfo);

    let response = await fetch(apiUrl, {
        method: Info.Method.Get,
        headers: {
            'Content-Type': postInfo.type,
        },
        body: data,
    });
    
    return response.json();
}

