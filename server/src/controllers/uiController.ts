import { Request, Response } from 'express';
// import { IUser } from '../models/user';

class UIController {
    public verifyUser(req: Request, res: Response): Response {
        // const user = req.user as IUser;
        return res.status(201).json({ success: true });
    }
}

export default UIController;
