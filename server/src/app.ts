import express from 'express';
import morgan from 'morgan';
import path from 'path';
import router from './routes/router';
import connectMongo from './config/db';
// import { checkAuth } from './middleware/fireabase';
// import passport from 'passport';
// import { jwtStrategy } from './config/passport';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.middlewareSetup();
        this.assetSetup();
        this.routerSetup();
    }

    private middlewareSetup(): void {
        this.app.use(morgan('dev'));
        connectMongo();
        // this.app.use(checkAuth);
        // this.app.use(passport.initialize());
        // passport.use(jwtStrategy);
    }

    private assetSetup(): void {
        this.app.use(express.static(path.join(__dirname, 'build')));
    }

    private routerSetup(): void {
        for (const route of router) {
            this.app.use(route.path, route.router);
        }
        //default return
        if (process.env.NODE_ENV === 'production') {
            this.app.get('/*', (req, res) => {
                res.sendFile(path.join(__dirname, 'build', 'index.html'));
            });
        }
    }
}

export default new App().app;
