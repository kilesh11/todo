import { Response } from 'express';
import { IFirebaseRequset } from '../interface/firebase';

class UIController {
    public verifyUser(req: IFirebaseRequset, res: Response): Response {
        const user = req?.currentUser;
        return res.status(201).json({ success: true, uid: user?.uid, email: user?.email });
    }
}

export default UIController;
