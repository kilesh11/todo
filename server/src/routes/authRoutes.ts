import MainRoute from './route.abstract';
import AuthController from '../controllers/authController';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

class UIRoutes extends MainRoute {
    private authController: AuthController = new AuthController();

    constructor() {
        super();
        this.setRoutes();
        this.path = '/auth';
    }

    protected setRoutes(): void {
        this.router.use(cookieParser());
        this.router.use(bodyParser.json());
        this.router.route('/register').post(this.authController.signUp);
        this.router.route('/login').post(this.authController.signIn);
        this.router.route('/logout').post(this.authController.logout);
    }
}

export default UIRoutes;
