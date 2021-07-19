
// indicate which column is modified
interface Edit {
    title: boolean,
    abstract: boolean,
    body: boolean,
    keywords: boolean,
}

export interface Article {
    title?: string,
    abstract?: string,
    body?: string,
    lastModified: Date,
    keywords?: string,
}

export interface EditArticle {
    params: Edit,
    data: Article,
}

export interface Result {
    data: string,
    statusCode: number,
    error: Error | null,
}
