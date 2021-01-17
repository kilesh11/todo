import { Request } from 'express';
import { Strategy, StrategyOptions } from 'passport-jwt';
import User, { IUser } from '../models/user';

const cookieExtractor = (req: Request) => {
    let token = null;
    if (req && req.cookies) token = req.cookies['token'];
    return token;
};

const opt: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWTSECRET,
    passReqToCallback: true,
};

export const jwtStrategy = new Strategy(
    opt,
    async (
        req: Request,
        payload: { id: string; name: string },
        done: (err: null, user: boolean | IUser) => void | PromiseLike<void>,
    ) => {
        try {
            const user = await User.findById(payload.id);
            if (user) {
                req.user = user;
                return done(null, user);
            }
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    },
);
