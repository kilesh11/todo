import { Router } from 'express';

abstract class MainRoute {
    #path = '/api';
    #router: Router = Router();
    protected abstract setRoutes(): void;

    set path(pathName: string) {
        this.#path = pathName;
    }

    get path(): string {
        return this.#path;
    }

    get router(): Router {
        return this.#router;
    }
}

export default MainRoute;
