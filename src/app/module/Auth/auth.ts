import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TuserRole } from '../User/user.interface';
import { catchAsync } from './validateRequest';
import { User } from '../User/user.model';
import { AuthorizationError, NotFoundError } from '../../utils/customErrors';

const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Validate Bearer Token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('You are not authorized!');
    }

    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '

    const decoded = jwt.verify(token, 'secret') as JwtPayload;

    const { role, id } = decoded;

    const user = await User.findOne({ _id: id });
    console.log(user);

    if (!user) {
      throw new NotFoundError('This user is not found!');
    }

    // Check if the user is blocked
    if (user.isBlocked) {
      throw new Error('This user is blocked!');
    }

    // Check user roles
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AuthorizationError('You are not authorized');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
