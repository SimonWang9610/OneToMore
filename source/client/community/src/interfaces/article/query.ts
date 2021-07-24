import { gql } from "@apollo/client";

const GET_ARTICLES = gql`
    query getArticles {
        Article {
            title: String!
            author: String!
            commentCount: Int!
            likeCount: Int!
            liked: boolean!
            modifiedAt: String!
        }
    }`;

const GET_SINGLE = gql`
    query getSingle($id: ID!) {
        Single {
            title: String!
            abstract: String!
            content: String!
            author: String!
            createdAt: String!
            modifiedAt: String!
            commentCount: Int!
            likeCount: Int!
            liked: boolean!
            collected: boolean!
        }
    }`;

const GET_COMMENTS = gql`
    query getComments($id:ID!) {
        Comment {
            author: String!
            content: String!
            createdAt: String!
        }
    }`;

const GET_COLLECTIONS = gql`
    query getCollections($category: String) {
        Article {
            title: String!
            author: String!
            category: String!
        }
    }`;

export const Query = {
    GET_ARTICLES,
    GET_SINGLE,
    GET_COLLECTIONS,
    GET_COMMENTS,
};