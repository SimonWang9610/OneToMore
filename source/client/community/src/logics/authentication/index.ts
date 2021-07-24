import { get, post } from "../../services";
import { setToken } from "../../services/utils";

const PREFIX_URL = '/api/v1/user';

interface Result {
    data: string,
    error: Error | null,
}
export const authenticate = async (data: FormData, prefix: string) => {
    // /api/v1/user/register
    const request = {
        url: PREFIX_URL + prefix,
        suffix: null,
        type: "application/json",
        params: null,
        query: null,
    };

    try {
        let res = await post<Result>(request, data);

        if (res.error) throw res.error;
        
        return JSON.parse(res.data);
    } catch (err) {
        console.error(err);
    }
}
