import { post } from "../../services/post";
import { get } from "../../services/get";
import { Article, EditArticle, Result } from "../../interfaces/article/types";
import { Request } from "../../interfaces/services/types";

export async function create(info: Request, data: Article): Promise<Result | Error> {
    return post<Result>(info, JSON.stringify(data));
}

export async function edit(info: Request, data: EditArticle): Promise<Result | Error> {
    return post<Result>(info, JSON.stringify(data));
}

export async function remove(info: Request): Promise<Result | Error> {
    return post<Result>(info, null);
}
export async function query(info: Request): Promise<Result | Error> {
    return get<Result>(info);
}