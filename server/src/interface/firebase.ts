import { Request } from 'express';
import admin from '../config/firebase';

export interface IFirebaseRequset extends Request {
    currentUser?: admin.auth.DecodedIdToken;
}
