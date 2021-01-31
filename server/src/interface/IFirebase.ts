import { Request } from 'express';
import admin from '../config/firebase';
import { ExpressContext } from 'apollo-server-express';
import { ITodo } from '../models/todo';
import Dataloader from 'dataloader';
export interface IFirebaseRequset extends Request {
    currentUser?: admin.auth.DecodedIdToken;
}

export interface IDataLoaderContext extends ExpressContext {
    dataLoaders: {
        todoLoader: Dataloader<string, ITodo[]>;
    };
    currentUser?: admin.auth.DecodedIdToken;
}
