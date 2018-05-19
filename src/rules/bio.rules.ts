import { check } from 'express-validator/check';
import { Bio } from '../db/models/userBio';
import { isDate } from 'util';

export const bioRules = {
  toSetBio: [
    check('UserId')
      .custom(UserId => Bio.find({ where: { UserId } }).then(b => !!!b))
        .withMessage('Bio has already been set.'),
    check('dob')
      .custom(dob => isDate(dob))
        .withMessage('Invalid Date format'),
  ],
};
