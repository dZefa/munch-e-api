import { check } from 'express-validator/check';
import { Bio } from '../db/models/userBio';

export const bioRules = {
  toSetBio: [
    check('UserId')
      .custom(UserId => UserId && !isNaN(UserId))
        .withMessage('Invalid UserId or is Null')
      .custom(UserId => Bio.find({ where: { UserId } }).then(b => !!!b))
        .withMessage('Bio has already been set.'),
    check('dob')
      .custom((dob) => {
        const date = new Date(dob);
        return date instanceof Date;
      })
        .withMessage('Invalid Date format'),
    check('firstName'),
    check('lastName'),
  ],
};
