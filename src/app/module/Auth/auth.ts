import { NextFunction, Request, Response } from 'express';
import { catchAsync } from './validateRequest';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { TuserRole } from '../User/user.interface';

const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'you are not authorized user',
      });
    }
    jwt.verify(
      token as string,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          res.status(401).json({
            success: false,
            message: 'you are not authorized user',
          });
        }
        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          res.status(401).json({
            success: false,
            message: 'you are not authorized user',
          });
        }
        console.log(decoded);
        req.user = decoded as JwtPayload;
        console.log(req.user);
      },
    );
    next();
  });
};

export default auth;
