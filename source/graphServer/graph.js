
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs  = require('./graphql/article/typeDefs');
const resolvers = require("./graphql/article/resolvers");
const { config } = require('./config');

const server = new ApolloServer({
    typeDefs,
    resolvers
});


mongoose.connect(config.MONGO).then((res) => {
    console.log("Database Connected");
    return server.listen({ port: config.PORT });
}).then((res) => {
    console.log(`Server running at ${res.url}`);
}).catch(err => {
    console.error(err);
});