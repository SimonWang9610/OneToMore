import { Dispatch } from "redux";
import { QueryAction, QueryTypes } from "../action-types";
import { ArticleQuery } from "../../../logics/article";

const getArticles = (page: number) => {
    return (dispatch: Dispatch<QueryAction>) => ArticleQuery.getArticles([{ key: "page", value: `${page}` }]).then(data => {
        dispatch({
            type: QueryTypes.ARTICLE,
            payload: data
        })
    })
}

const getSingle = (id: string) => {
    return (dispatch: Dispatch<QueryAction>) => ArticleQuery.getSingle(id, null).then(data => {
        dispatch({
            type: QueryTypes.SINGLE,
            payload: data
        })
    })
}
const getComments = (articleGuid: string, commentGuid: string | null) => {
    return (dispatch: Dispatch<QueryAction>) => ArticleQuery.getComments(commentGuid ? [articleGuid, commentGuid] : [articleGuid], null).then(data => {
        dispatch({
            type: QueryTypes.COMMENTS,
            payload: data
        })
    })
}

const isLiked = (id: string) => {
    return (dispatch: Dispatch<QueryAction>) => ArticleQuery.liked(id, null).then(data => {
        dispatch({
            type: QueryTypes.LIKED,
            payload: data
        })
    })
}

const isCollected = (id: string) => {
    return (dispatch: Dispatch<QueryAction>) => ArticleQuery.collected(id, null).then(data => {
        dispatch({
            type: QueryTypes.COLLECTED,
            payload: data,
        })
    })
}

export const queryCreators = {
    getArticles,
    getSingle,
    getComments,
    isLiked,
    isCollected,
}