import { Article, Comment } from "../../../interfaces/article";
import { UnifiedType } from "../../../interfaces/article";

export enum MutationTypes {
    CREATE = "article/create",
    EDIT = "article/edit",
    LIKE = "article/like",
    COLLECT = "article/collect",
    COMMENT = "article/comment"
}

interface CreateAction {
    type: MutationTypes.CREATE,
    payload: UnifiedType
}

interface EditAction {
    type: MutationTypes.EDIT,
    payload: UnifiedType
}

interface LikeAction {
    type: MutationTypes.LIKE,
    payload: UnifiedType
}

interface CollectAction {
    type: MutationTypes.COLLECT,
    payload: UnifiedType
}

interface CommentAction {
    type: MutationTypes.COMMENT,
    payload: UnifiedType
}

export type MutationAction = CreateAction | EditAction | LikeAction | CollectAction | CommentAction;