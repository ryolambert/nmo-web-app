const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./resolvers');
// const Mutation = require('./resolvers/Mutation');
// const Query = require('./resolvers/Query');

const db = require('./db');

// Create the GraphQL Yoga Server

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db }),
  });
}

module.exports = createServer;
