import MainRoute from './route.abstract';
import UIController from '../controllers/uiController';
import AuthController from '../controllers/authController';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

class UIRoutes extends MainRoute {
    private uiController: UIController = new UIController();
    private authController: AuthController = new AuthController();

    constructor() {
        super();
        this.setRoutes();
        this.setPath('/ui');
    }

    protected setRoutes(): void {
        this.getRouter().use(cookieParser());
        this.getRouter().use(bodyParser.json());
        this.getRouter()
            .route('/verify')
            .get(this.authController.authenticateJWT, this.uiController.verifyUser);
    }
}

export default UIRoutes;
