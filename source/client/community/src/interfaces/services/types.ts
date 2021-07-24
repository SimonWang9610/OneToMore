
export interface Query {
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
        Json = "application/json",
        Form = "multipart/form-data"
    }

}


export interface Request {
    url: string,
    suffix: string[] | null,
    type: string,
    params: string[] | null,
    query: Query[] | null,
}

export function parseRequest(request: Request): string {
    let requestString = request.url;

    request.params?.forEach((param, key) => {
        let suffix = request.suffix ? request.suffix[key] : "";

        requestString.concat("/" + param + suffix);
    });

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