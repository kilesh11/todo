import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const createJWT = (user: IUser) => {
    return jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWTSECRET as string,
        {
            expiresIn: '15m',
        },
    );
};

class AuthController {
    public async signUp(req: Request, res: Response): Promise<Response> {
        if (!req.body.name || !req.body.password || !req.body.email) {
            return res.status(200).json({
                success: false,
                msg: 'email, name and password are required for register!',
            });
        }

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(200).json({ success: false, msg: 'user already existed' });
        }
        const newUser = new User(req.body);
        await newUser.save();

        return res
            .status(201)
            .json({ success: true, data: { email: newUser.email, name: newUser.name } });
    }

    public async signIn(req: Request, res: Response): Promise<Response> {
        if (!req.body.password || !req.body.email) {
            return res.status(200).json({ msg: 'email and password are required for log in!' });
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ success: false, msg: 'userNotExist' });
        }
        const isPwMatch = await user.matchPassword(req.body.password);
        if (isPwMatch) {
            const token = createJWT(user);
            res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
            return res
                .status(200)
                .json({ success: true, data: { email: user.email, name: user.name } });
        }
        return res.status(200).json({ success: false, msg: 'passwordIncorrect' });
    }

    public logout(req: Request, res: Response): Response {
        res.clearCookie('token');
        return res.status(200).json({ success: true });
    }

    public authenticateJWT(req: Request, res: Response, next: NextFunction): void {
        passport.authenticate('jwt', (err, user: IUser, info) => {
            if (err || info?.name === 'Error') {
                return res.status(200).json({ success: false, msg: 'unauthorized' });
            }
            if (!user) {
                if (info.name === 'TokenExpiredError') {
                    return res.status(200).json({ success: false, msg: 'TokenExpiredError' });
                }
                return res.status(200).json({ success: false, msg: 'unauthorized' });
            } else {
                return next();
            }
        })(req, res, next);
    }
}

export default AuthController;
