import { Router } from 'express';

import { userRouter } from './user.router';
import { bioRouter } from './bio.router';

import { tokenGuard } from '../middlewares/token-guard';

export const router: Router = Router();

router.use('/user', userRouter);

router.use('/bio', tokenGuard(), bioRouter);
