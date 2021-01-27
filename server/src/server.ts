import app from './app';
import admin from './config/firebase';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers/index';
import typeDefs from './typeDefs/index';

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
        context: async ({ req, res }) => {
            if (req.headers?.authorization?.startsWith('Bearer ')) {
                const idToken = req.headers.authorization.split('Bearer ')[1];
                try {
                    const currentUser = await admin.auth().verifyIdToken(idToken);
                    return { currentUser, req, res };
                } catch (err) {
                    return { req, res };
                }
            } else {
                return { req, res };
            }
        },
    });
    server.applyMiddleware({ app });

    const port = normalizePort(process.env.PORT || '5000');
    app.listen(port, () => {
        console.log('Express Graphql server listening on Port ', port);
    });
};

startServer();
