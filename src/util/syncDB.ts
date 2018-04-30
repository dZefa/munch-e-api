import { sequelize } from '../db';
import { User } from '../db/models/user';
import { Bio } from '../db/models/userBio';

import logger from '../util/logger';

export const syncDB = (force: boolean) => {
  return sequelize.authenticate()
    .then(() => {
      logger(`Database authenticated!`);
      User.sync({ force })
        .then(() => {
          logger(`User model synced!`);
          Bio.sync({ force })
            .then(() => {
              logger(`Bio model synced!`);
            })
            .catch((err) => {
              logger(`Error syncing Bio model. ${err}`);
            });
        })
        .catch((err) => {
          logger(`Error syncing User model. ${err}`);
        });
    })
    .catch((err) => {
      logger(`Error authenticating database. ${err}`);
    });
};
