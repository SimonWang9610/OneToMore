import { PREFIX_URL } from "../../interfaces/article";
import { Query } from "../../interfaces/services";
import { Handlers } from "./utils";

const getArticles = (query: Query[] | null) => {
    // /api/v1/article
    // return data: {articles: {...}}
    const request = {
        url: PREFIX_URL,
        suffix: null,
        type: "application/json",
        params: null,
        query: query,
    };

    return Handlers.getHandler(request, false);
}

const getSingle = async (id: string, query: Query[] | null) => {
    // /api/v1/article/:id
    // return data: {article: {...}}
    const request = {
        url: PREFIX_URL,
        suffix: null,
        type: "application/json",
        params: [id],
        query: query,
    };

    return Handlers.getHandler(request, false);

}

const getComments = async (ids: string[], query: Query[] | null) => {
    // /api/v1/article/:articleGuid/comment/:commentGuid
    // return data: {comment: {...}}
    const request = {
        url: PREFIX_URL,
        suffix: ["/comment"],
        type: "application/json",
        params: ids,
        query: query,
    };

    return Handlers.getHandler(request, false);

}

const getCollections = async (ids: string[], query: Query[] | null) => {
    // /api/v1/article/:userGuid/collection
    const request = {
        url: PREFIX_URL,
        suffix: ["/collection"],
        type: "application/json",
        params: ids,
        query: query,
    };
    
    return Handlers.getHandler(request, false);

}

const liked = async (id: string, query: Query[] | null) => {
    // /api/v1/article/:articleGuid/liked
    // TODO require UserGuid
    const request = {
        url: PREFIX_URL,
        suffix: ["/liked"],
        type: "application/json",
        params: [id],
        query: query,
    };

    return Handlers.getHandler(request, true);

}

const collected = async (id: string, query: Query[] | null) => {
    
    const request = {
        url: PREFIX_URL,
        suffix: ["/collected"],
        type: "application/json",
        params: [id],
        query: query,
    };

    return Handlers.getHandler(request, true);

}

export const ArticleQuery = {
    getSingle,
    getArticles,
    getComments,
    getCollections,
    liked,
    collected,
}
