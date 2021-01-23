import admin from '../config/firebase';
import { IFirebaseRequset } from '../interface/firebase';
import { Response, NextFunction } from 'express';

export const checkAuth = async (
    req: IFirebaseRequset,
    res: Response,
    next: NextFunction,
): Promise<void | Response> => {
    if (req.headers?.authorization?.startsWith('Bearer ')) {
        const idToken = req.headers.authorization.split('Bearer ')[1];
        try {
            const currentUser = await admin.auth().verifyIdToken(idToken);
            req.currentUser = currentUser;
        } catch (err) {
            return res.status(200).json({ success: false, msg: 'unauthorized' });
        }
    } else {
        return res.status(200).json({ success: false, msg: 'unauthorized' });
    }
    next();
};
