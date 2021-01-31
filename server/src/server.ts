import app from './app';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers/indexResolvers';
import typeDefs from './typeDefs/indexTypeDefs';
import todoLoader from './dataLoaders/todo';
import { checkAuth } from './middleware/fireabaseMiddleware';

function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) return val;

    if (port >= 0) return port;

    return false;
}

const startServer = () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req, res }) =>
            await checkAuth(req, { req, res, dataLoaders: { todoLoader } }),
    });
    server.applyMiddleware({ app });

    const port = normalizePort(process.env.PORT || '5000');
    app.listen(port, () => {
        console.log('Express Graphql server listening on Port ', port);
    });
};

startServer();
