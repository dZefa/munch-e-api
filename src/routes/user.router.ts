import { Router, Request, Response } from 'express';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator/check';

import { userRules } from '../rules/user.rules';
import { UserService } from '../services/user.service';
import { UserAddModel } from '../db/models/user';

export const userRouter: Router = Router();
const userService = new UserService();

userRouter.post('/register', userRules['forRegister'], (req: Request, res: Response): object => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ result: { errors: errors.array() } });
  }

  const payload = matchedData(req) as UserAddModel;
  const user = userService.register(payload);

  return user.then(user => res.status(201).send({ result: { user } }));
});

userRouter.post('/login', userRules['forLogin'], (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ result: { errors: errors.array() } });
  }

  const payload = matchedData(req) as UserAddModel;
  const token = userService.login(payload);

  return token.then(token => res.status(200).send({ result: { token } }));
});
