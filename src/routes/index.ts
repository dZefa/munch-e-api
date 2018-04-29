import { Router } from 'express';

import { userRouter } from './user.router';

export const router: Router = Router();

router.use('/user', userRouter);
