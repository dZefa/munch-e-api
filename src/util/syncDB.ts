import { sequelize } from '../db';
import { User } from '../db/models/user';

import logger from '../util/logger';

export const syncDB = (force: boolean) => {
  return sequelize.authenticate()
    .then(() => {
      logger(`Database authenticated!`);
      User.sync({ force })
        .then(() => {
          logger(`User model synced!`);
        })
        .catch((err) => {
          logger(`Error syncing User model. ${err}`);
        });
    })
    .catch((err) => {
      logger(`Error authenticating database. ${err}`);
    });
};
