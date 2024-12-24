import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TuserRole } from '../User/user.interface';
import { catchAsync } from './validateRequest';
import { User } from '../User/user.model';
import { AuthorizationError, NotFoundError } from '../../utils/customErrors';
const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You are not authorized!');
    }

    const decoded = jwt.verify(token, 'secret') as JwtPayload;

    const { role, id } = decoded;

    const user = await User.findOne({ _id: id });
    console.log(user);

    if (!user) {
      throw new NotFoundError('This user is not found !');
    }

    // checking if the user is inactive
    const userStatus = user?.isBlocked;

    if (userStatus === true) {
      throw new Error('This user is blocked ! !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AuthorizationError('You are not authorized');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
