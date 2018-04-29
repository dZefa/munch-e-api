import { Request, Response, NextFunction } from 'express';
import { default as jwt } from 'jsonwebtoken';

const jwtVerify = (type: number) => {
  const middleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || '';
    const decoded = jwt.decode(token, { complete: true });
  };

  return middleware;
};

export default jwtVerify;
