import { default as Sequelize } from 'sequelize';
import { sequelize } from '../index';

import { User, UserModel } from './user';

export interface BioAddModel {
  firstName: string | null;
  lastName: string | null;
  dob: string | null;
  UserId: number;
}

export interface BioModel extends Sequelize.Model<BioModel, BioAddModel> {
  id: number;
  UserId: number;
  firstName: string | null;
  lastName: string | null;
  dob: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BioViewModel {
  firstName: string;
  lastName: string;
  UserId: number;
}

export const Bio = sequelize.define<BioModel, BioAddModel> ('bio', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  dob: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

Bio.belongsTo(User, { foreignKey: { allowNull: false, name: 'UserId' }, onDelete: 'CASCADE' });
