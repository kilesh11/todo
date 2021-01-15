import { Request } from 'express';
import { Strategy, StrategyOptions } from 'passport-jwt';
import User, { IUser } from '../models/user';

const cookieExtractor = (req: Request) => {
    console.log(
        'kyle_debug ~ file: passport.ts ~ line 6 ~ cookieExtractor ~ req.cookies',
        req.cookies,
    );
    let token = null;
    if (req && req.cookies) token = req.cookies['token'];
    console.log('kyle_debug ~ file: passport.ts ~ line 12 ~ cookieExtractor ~ token', token);
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
