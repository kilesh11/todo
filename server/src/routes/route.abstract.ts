import {Router} from "express";

abstract class MainRoute {
    private path = '/api';
    private router: Router = Router();
    protected abstract setRoutes(): void;

    protected setPath(pathName: string): void {
        this.path = pathName;
    }

    public getPath(): string {
        return this.path;
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default MainRoute;