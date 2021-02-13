import mongoose from 'mongoose';

const connect = async (): Promise<void> => {
    const connection = mongoose.connection;
    connection.on('connected', () =>
        console.log(`MongoDB Connection Established: ${new Date(Date.now())}`),
    );
    connection.on('close', () => console.log('MongoDB Connection Closed'));
    connection.on('reconnected', () => console.log('MongoDB Connection Re-established'));
    connection.on('disconnected', () => {
        console.log(`MongoDB Connection Disconnected: ${new Date(Date.now())}`);
        console.log('MongoDB reconnecting');
        setTimeout(() => {
            mongoose.connect(process.env.MONGOURI as string, {
                useFindAndModify: false,
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                socketTimeoutMS: 3000,
                connectTimeoutMS: 3000,
            });
        }, 3000);
    });
    connection.on('error', (err) => console.log('MongoDB Connection Error:', err));

    try {
        if (process.env.NODE_ENV === 'development') mongoose.set('debug', true);
        const conn = await mongoose.connect(process.env.MONGOURI as string, {
            useFindAndModify: false,
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('MongoDB host: ', conn.connection.host);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default connect;
