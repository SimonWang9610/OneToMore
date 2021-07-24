
const { gql } = require('apollo-server');

module.exports = gql`
    type Article {
        id: ID
        title: String
        author: String
        commentCount: Int
        likeCount: Int
    }

    type Single {
        title: String
        author: String
        createdAt: String
        modifiedAt: String
        abstract: String
        content: String
        comments: [Comment]
        commentCount: Int
        likeCount: Int
    }

    type Comment {
        id: ID
        author: String
        content: String
        createdAt: String
    }

    type User {
        email: String
        username: String
        token: String
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmation: String!
        email: String!
    }

    type Query {
        getArticles: [Article]
        getSingle(id: ID!): Article
        getComments(id: ID!): [Comment]
        getCollections(category: String!): [Article]
    }

    type Mutation {
        register(info: RegisterInput): User!
        login(username: String!, password: String!): User!
        createArticle(title: String!, abstract: String, content: String!, author:String!): String!
        deleteArticle(id: ID!): Boolean!
        createComment(id: ID!, content: String!, author: String!): String!
        deleteComment(id: ID!, commentId: ID!): String!
        likeArticle(id: ID!): Boolean!
        collectArticle(id: ID!): Boolean!
    }
`;