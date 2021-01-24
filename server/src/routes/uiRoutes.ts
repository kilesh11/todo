import MainRoute from './route.abstract';
import UIController from '../controllers/uiController';
// import AuthController from '../controllers/authController';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { checkAuth } from '../middleware/fireabase';

class UIRoutes extends MainRoute {
    private uiController: UIController = new UIController();
    // private authController: AuthController = new AuthController();

    constructor() {
        super();
        this.setRoutes();
        this.path = '/ui';
    }

    protected setRoutes(): void {
        this.router.use(cookieParser());
        this.router.use(bodyParser.json());
        this.router.route('/verify').get(checkAuth, this.uiController.verifyUser);
    }
}

export default UIRoutes;
