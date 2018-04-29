import { default as Sequelize } from 'sequelize';
import logger from '../util/logger';

export const sequelize = new Sequelize(process.env.DB_URL!);

sequelize.authenticate().then(() => {
  logger(`DB authenticated!`);
});
