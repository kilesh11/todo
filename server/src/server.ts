import app from './app';

function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) return val;

    if (port >= 0) return port;

    return false;
}

const startServer = () => {
    const port = normalizePort(process.env.PORT || '5000');
    app.listen(port, () => {
        console.log('Express Graphql server listening on Port ', port);
    });
};

startServer();
