import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import ITokenPayload from '../interfaces/TokenPayload.interface';

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization === undefined || req.headers.authorization.length === 0) {
    return res.status(400).json({
      error: 'Missing token',
    });
  }

  const token = req.headers.authorization.split(' ')[1];
  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded === undefined) {
      return res.status(401).json({
        error: err.message,
      });
    }

    req.user = decoded as ITokenPayload;

    return next();
  });
}

export default ensureAuthenticated;
