import { post } from "../../services/post";
import { get } from "../../services/get";
import { PostResult } from "../../interfaces/multimedia/types";
import { Request } from "../../interfaces/services/types";


export async function upload(info: Request, file: Blob): Promise<PostResult | Error> {

    let formData = new FormData();
    formData.append("files[]", file);

    return post<PostResult>(info, formData);
}
