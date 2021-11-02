import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from '../resolvers/indexResolvers';
import typeDefs from '../typeDefs/indexTypeDefs';
import todoLoader from '../dataLoaders/todo';
import { checkAuth } from '../middleware/fireabaseMiddleware';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) =>
        await checkAuth(req, { req, res, dataLoaders: { todoLoader } }),
});

export default async (app: express.Application): Promise<void> => {
    await server.start()
    server.applyMiddleware({ app });
};
