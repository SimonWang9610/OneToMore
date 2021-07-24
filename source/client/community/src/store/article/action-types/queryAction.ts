import { Article, Single, Comment } from "../../../interfaces/article";
import { UnifiedType } from "../../../interfaces/article";

export enum QueryTypes {
    ARTICLE = "articles",
    SINGLE = "article/single",
    LIKED = "article/liked",
    COLLECTED = "article/collected",
    COMMENTS = "article/comments"
}

interface ArticleAction {
    type: QueryTypes.ARTICLE,
    payload: UnifiedType
}

interface SingleAction {
    type: QueryTypes.SINGLE,
    payload: UnifiedType
}

interface LikedAction {
    type: QueryTypes.LIKED,
    payload: UnifiedType
}

interface CollectedAction {
    type: QueryTypes.COLLECTED,
    payload: UnifiedType
}

interface CommentsAction {
    type: QueryTypes.COMMENTS,
    payload: UnifiedType
}

export type QueryAction = ArticleAction | SingleAction | LikedAction | CollectedAction | CommentsAction;

