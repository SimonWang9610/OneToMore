
// indicate which column is modified
interface Edit {
    title: boolean,
    abstract: boolean,
    body: boolean,
    keywords: boolean,
}

// export interface Article {
//     title?: string,
//     abstract?: string,
//     body?: string,
//     lastModified: Date,
//     keywords?: string,
// }

// export interface EditArticle {
//     params: Edit,
//     data: Article,
// }


export interface Article {
    Guid: string,
    author: string,
    title: string,
    category: string,
    createdAt: Date,
    lastModified: Date,
    viewsCount: number,
    commentCount: number,
    likeCount: number,
}

export interface Single {
    Guid: string,
    Author: string,
    title: string,
    category: string,
    content: string,
    createdAt: Date,
    LastModified: Date,
    viewsCount: number,
    commentCount: number,
    likeCount: number,
}

export interface Comment {
    Guid: string,
    content: string,
    createdAt: string,
    author: string,
}


export interface GetArticles {
    data: {
        articles: [Article]
    },
    error: Error | null,
}

interface GetSingle {
    data: {
        article: Single
    },
    error: Error | null,
}

interface GetComments {
    data: {
        comments: [Comment]
    },
    error: Error | null,
}

interface GetCollection {
    data: {
        collections: [Article]
    },
    error: Error | null,
}

interface Liked {
    data: {
        liked: boolean
    },
    error: Error | null,
}

interface Collected {
    data: {
        collected: boolean
    },
    error: Error | null,
}

interface Creation {
    data: {
        created: boolean,
    },
    error: Error | null,
}

interface Edit {
    data: {
        article: Single
    },
    error: Error | null,
}

interface AddComment {
    data: {
        comment: Comment,
    },
    error: Error | null,
}


interface Like {
    data: {
        liked: boolean
    },
    error: Error | null,
}

interface Collect {
    data: {
        collected: boolean
    },
    error: Error | null,
}


interface Remove {
    data: {
        success: boolean,
    },
    error: Error | null,
}

export interface Response {
    success: boolean,
}

export type UnifiedType = [Article] | Single | [Comment] | Comment | Response;

export interface Result {
    data: any,
    error: Error | null,
}


export type QueryResult = GetArticles | GetSingle | GetComments | GetCollection | Liked | Collected;

export type MutationResult = Creation | Edit | AddComment | Like | Collect;

export type RemoveResult = Remove;