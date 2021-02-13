import { Response, NextFunction } from 'express';
import { IFirebaseRequset } from '../interface/IFirebase';
import admin from '../config/firebase';
import { Request } from 'express';
import { IDataLoaderContext } from '../interface/IFirebase';

export const checkRestAuth = async (
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

export const checkAuth = async (
    req: Request,
    context: IDataLoaderContext,
): Promise<IDataLoaderContext> => {
    if (req.headers.authorization?.startsWith('Bearer ')) {
        const idToken = req.headers.authorization.split('Bearer ')[1];
        try {
            const currentUser = await admin.auth().verifyIdToken(idToken);
            return { ...context, currentUser };
        } catch (err) {
            return context;
        }
    } else {
        return context;
    }
};
