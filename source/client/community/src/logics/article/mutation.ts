import { PREFIX_URL } from "../../interfaces/article";
import { Query } from "../../interfaces/services";
import { Handlers } from "./utils";

// TODO: create headers {token} to verify the identity
const createArticle = async (data: string, query: Query[] | null ) => {
    // /api/v1/article/create
    const request = {
        url: PREFIX_URL + "/create",
        suffix: null,
        type: "application/json",
        params: null,
        query: query,
    };
    
    return Handlers.postHandler(request, data);
}

const editArticle = async (data: string, id: string, query: Query[] | null) => {
    // /api/v1/article/edit/:articleGuid

    const request = {
        url: PREFIX_URL + "/edit",
        suffix: null,
        type: "application/json",
        params: [id],
        query: query,
    };
    
    return Handlers.postHandler(request, data);

}

const deleteArticle = async (id: string, query: Query[] | null) => {
    const request = {
        url: PREFIX_URL + "/delete",
        suffix: null,
        type: "application/json",
        params: [id],
        query: query,
    };

    return Handlers.removeHandler(request);

}


const createComment = async (id: string, data: string, query: Query[] | null) =>{
    // /api/v1/article/:articleGuid/comment/create
    const request = {
        url: PREFIX_URL,
        suffix: ["/comment"],
        type: "application/json",
        params: [id],
        query: query,
    }
    
    return Handlers.postHandler(request, data);

}

const deleteComment = async (ids: string[], query: Query[] | null) => {
    // /api/v1/article/:articleGuid/comment/:commentGuid
    const request = {
        url: PREFIX_URL,
        suffix: ["/comment"],
        type: "application/json",
        params: ids,
        query: query,
    };
    
    return Handlers.removeHandler(request);

}

const likeArticle = async (id: string, query: Query[] | null) => {
    // /api/v1/article/like/:articleGuid
    // TODO token authentication
    const request = {
        url: PREFIX_URL + "/like",
        suffix: null,
        type: "application/json",
        params: [id],
        query: query,
    };
    
    return Handlers.postHandler(request, null);

}

const dislikeArticle = async (id: string, query: Query[] | null) => {
    
    const request = {
        url: PREFIX_URL + "/like",
        suffix: null,
        type: "application/json",
        params: [id],
        query: query,
    };

    return Handlers.removeHandler(request);
}

const collectArticle = async (id: string, query: Query[] | null) => {
    // /api/v1/article/collect/:articleGuid
    // TODO token authentication

    const request = {
        url: PREFIX_URL + "/collect",
        suffix: null,
        type: "application/json",
        params: [id],
        query: query,
    };

    return Handlers.postHandler(request, null);

}


export const ArticleMutation = {
    createArticle,
    editArticle,
    deleteArticle,
    createComment,
    deleteComment,
    likeArticle,
    dislikeArticle,
    collectArticle,
}
