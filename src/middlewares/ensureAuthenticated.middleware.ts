import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization === undefined) {
    return res.status(400).json({
      error: 'Missing token',
    });
  }

  const token = req.headers.authorization.split(' ')[1];
  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }

    if (decoded === undefined) {
      return res.status(401).json({
        error: 'Invalid token',
      });
    }
    return next();
  });
}

export default ensureAuthenticated;
