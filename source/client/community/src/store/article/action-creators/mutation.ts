import { Dispatch } from "redux";
import { ArticleCreation, ArticleEdit} from "../../../interfaces/article";
import { MutationAction, MutationTypes } from "../action-types";
import { ArticleMutation } from "../../../logics/article";

const createArticle = (article: ArticleCreation) => {
    return (dispatch: Dispatch<MutationAction>) => ArticleMutation.createArticle(JSON.stringify(article), null).then(data => {
        dispatch({
            type: MutationTypes.CREATE,
            payload: data
        })
    })
}

const editArticle = (article: ArticleEdit, id: string) => {
    return (dispatch: Dispatch<MutationAction>) => ArticleMutation.editArticle(JSON.stringify(article), id, null).then(data => {
        dispatch({
            type: MutationTypes.EDIT,
            payload: data,
        })
    })
}

const likeArticle = (id: string) => {
    return (dispatch: Dispatch<MutationAction>) => ArticleMutation.likeArticle(id, null).then(data => {
        dispatch({
            type: MutationTypes.LIKE,
            payload: data,
        })
    })
}

const collectArticle = (id: string) => {
    return (dispatch: Dispatch<MutationAction>) => ArticleMutation.collectArticle(id, null).then(data => {
        dispatch({
            type: MutationTypes.COLLECT,
            payload: data,
        })
    })
}

const commentArticle = (id: string, content: string) => {
    return (dispatch: Dispatch<MutationAction>) => ArticleMutation.createComment(id, content, null).then(data => {
        dispatch({
            type: MutationTypes.COMMENT,
            payload: data,
        })
    })
}

export const mutationCreators = {
    createArticle,
    editArticle,
    likeArticle,
    collectArticle,
    commentArticle,
}