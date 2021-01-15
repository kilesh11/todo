import MainRoute from "./route.abstract";
import UIRoutes from "./uiRoutes";
import AuthRoutes from "./authRoutes";

const router: Array<MainRoute> = [
    new UIRoutes(),
    new AuthRoutes(),
];

export default router;