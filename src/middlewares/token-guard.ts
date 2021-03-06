import { default as jwt } from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';
import { RequestHandler } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

function getTokenFromHeaders(headers: IncomingHttpHeaders) {
  const header = headers.authorization as string;

  return header;
}

export const tokenGuard: (() => RequestHandler) = (() => (req, res, next) => {
  const token = getTokenFromHeaders(req.headers) || req.query.token || req.body.token || '';
  const hasAccess = userService.verifyToken(token);

  hasAccess.then((a) => {
    if (!a) {
      return res.status(403).send({ result: { message: 'No Access' } });
    }

    next();
  });
});
