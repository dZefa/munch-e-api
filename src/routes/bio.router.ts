import { Router, Request, Response } from 'express';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator/check';

import { BioService } from '../services/bio.service';
import { bioRules } from '../rules/bio.rules';
import { BioAddModel } from '../db/models/userBio';

export const bioRouter: Router = Router();
const bioService = new BioService();

bioRouter.post('/set', bioRules['toSetBio'], (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ result: { errors: errors.array() } });
  }

  const payload = matchedData(req) as BioAddModel;
  const bio = bioService.setBio(payload);

  return bio.then(bio => res.status(201).send({ result: { bio } }));
});
