import { default as Sequelize } from 'sequelize';

const logging = process.env.NODE_ENV === 'test' ? false : true;

export const sequelize = new Sequelize(process.env.DB_URL!, { logging });
