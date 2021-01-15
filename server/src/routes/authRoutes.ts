import MainRoute from './route.abstract';
import AuthController from '../controllers/authController';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

class UIRoutes extends MainRoute {
    private authController: AuthController = new AuthController();

    constructor() {
        super();
        this.setRoutes();
        this.setPath('/auth');
    }

    protected setRoutes(): void {
        this.getRouter().use(cookieParser());
        this.getRouter().use(bodyParser.json());
        this.getRouter().route('/register').post(this.authController.signUp);
        this.getRouter().route('/login').post(this.authController.signIn);
        this.getRouter().route('/logout').post(this.authController.logout);
    }
}

export default UIRoutes;
