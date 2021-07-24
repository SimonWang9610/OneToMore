import { gql } from "@apollo/client";
// import { Article } from "../../interfaces/article";

const types = gql`
    type Article {
        title: string!
        author: string!
        commentCount: Int!
        likeCount: Int!
        modifiedAt: string!
    }

    type Single {
        title: string!
        abstract: string!
        content: string!
        author: string!
        createdAt: string!
        modifiedAt: string!
        commentCount: Int!
        likeCount: Int!
        liked: boolean
        collected: boolean
    }

    type Comment {
        author: string!
        createdAt: string!
    }

    type User {
        email: string!
        username: string!
        token: string!
    }

    input RegisterInput {
        username: string!
        password: string!
        confirmation: string!
        email: string!
    }

    type Query {
        getArticles: [Article]
        getArticle(id: ID!): Single
    }

    type Mutation {
        register(info: RegisterInput): User!
        login(username: string!, password: string!): User!
        createArticle(content: string!): Single!
        deleteArticle(id: ID!): boolean!
        createComment(id: ID!, content: string!): Comment!
        deleteComment(id: ID!, commentId: ID!): boolean!
        likeArticle(id: ID!): boolean!
        collectArticle(id: ID!): boolean!
    }
`;

export {
    types
}