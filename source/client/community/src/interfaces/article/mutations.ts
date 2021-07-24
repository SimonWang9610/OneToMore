

export interface ArticleCreation {
    title: string,
    content: string,
    category: string,
}

export interface ArticleEdit {
    title: string,
    content: string,
    category: string,
    articleGuid: string,
}


export interface modifiedFields {
    title: boolean,
    content: boolean,
    category: boolean,
}
