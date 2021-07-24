import { get, post, remove } from "../../services";
import { Result, QueryResult, MutationResult, RemoveResult} from "../../interfaces/article";
import { Request } from "../../interfaces/services";
import { getTokenFromStore } from "../../services/utils";

const getHandler = async (request: Request, needToken: boolean) => {
    
    let token: string | null = null;

    try {

        if (needToken) {
            token = getTokenFromStore();
        }

        let res = await get<Result>(request, token);

        if (res.error) throw res.error;

        return res.data

    } catch (err) {
        throw new Error(err);
    }
};

const postHandler = async (request: Request, data: string | null) => {
    
    try {
        let res = await post<Result>(request, data);

        if (res.error) throw res.error;

        return res.data;

    } catch (err) {
        throw new Error(err);
    }
}

const removeHandler = async (request: Request) => {
    
    try {
        let res = await remove<Result>(request);

        if (res.error) throw res.error;

        return res.data;

    } catch (err) {
        throw new Error(err);
    }
}

export const Handlers = {
    getHandler,
    postHandler,
    removeHandler,
}