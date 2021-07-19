
interface Query {
    key: string,
    value: string,
}

export namespace Info {
    export enum Method {
        Get = "GET",
        Post = "POST",
        Delete = "DELETE",
    }
    
    export enum ContentType {
        Html = "text/html",
        Json = "text/json",
        Form = "multipart/form-data"
    }

}


export interface Request {
    url: string,
    type: string,
    query: Query[] | null,
}

export function parseRequest(request: Request): string {
    let requestString = request.url;

    if (request.query === null) {
        return requestString;
    } else {
        requestString += "?";

        request.query.forEach(pair => {
            requestString.concat(pair.key + '+' + pair.value + '&');
        });
    }

    return requestString;
}